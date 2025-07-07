import requests
import time
from django.core.management.base import BaseCommand
from django.conf import settings
from ...models import Game, Genre, Platform

def _fetch_paginated_data(start_url, api_key, command, max_pages=None):
    """
    Fetches data from a paginated RAWG endpoint with retries and a page limit.
    """
    if '?' in start_url:
        url = f"{start_url}&key={api_key}"
    else:
        url = f"{start_url}?key={api_key}"

    all_items = []
    page_num = 1

    while url:
        if max_pages and page_num > max_pages:
            command.stdout.write(f"Reached max page limit of {max_pages}. Stopping.")
            break

        command.stdout.write(f"  Fetching page {page_num}...")
        
        response = None
        for i in range(3):
            try:
                response = requests.get(url, timeout=10)
                response.raise_for_status()
                break
            except requests.exceptions.RequestException as e:
                command.stdout.write(command.style.WARNING(f"Attempt {i+1} failed: {e}. Retrying..."))
                time.sleep(3)
        
        if not response:
            command.stdout.write(command.style.ERROR("API request failed. Stopping."))
            return None

        data = response.json()
        all_items.extend(data.get('results', []))
        url = data.get('next')
        page_num += 1
        if url:
            time.sleep(0.5)

    return all_items


class Command(BaseCommand):
    help = 'Seeds the database with all Genres, Platforms, and a sample of Games from the RAWG.io API'

    def handle(self, *args, **options):
        api_key = settings.RAWG_API_KEY
        base_url = 'https://api.rawg.io/api'

        # --- 1. Seeding Genres ---
        self.stdout.write(self.style.SUCCESS("\n--- Seeding all Genres ---"))
        genres_data = _fetch_paginated_data(f"{base_url}/genres", api_key, self)
        if genres_data:
            for genre_data in genres_data:
                Genre.objects.get_or_create(
                    name=genre_data['name'],
                    defaults={'image_background': genre_data.get('image_background')}
                )
            self.stdout.write(self.style.SUCCESS(f"Successfully seeded {len(genres_data)} genres."))

        # --- 2. Seeding Platforms ---
        self.stdout.write(self.style.SUCCESS("\n--- Seeding all Parent Platforms ---"))
        platforms_data = _fetch_paginated_data(f"{base_url}/platforms/lists/parents", api_key, self)
        if platforms_data:
            for platform_data in platforms_data:
                Platform.objects.get_or_create(name=platform_data['name'], slug=platform_data['slug'])
            self.stdout.write(self.style.SUCCESS(f"Successfully seeded {len(platforms_data)} parent platforms."))

        # --- 3. Seed a sample of Games with a page limit ---
        self.stdout.write(self.style.SUCCESS("\n--- Seeding a sample of Games ---"))

        games_data = _fetch_paginated_data(
            f"{base_url}/games?page_size=40", 
            api_key, 
            self, 
            max_pages=5 
        )
        
        if games_data:
            for game_data in games_data:
                platforms_to_add = [Platform.objects.get(slug=p['platform']['slug']) for p in game_data.get('parent_platforms', []) if Platform.objects.filter(slug=p['platform']['slug']).exists()]
                genres_to_add = [Genre.objects.get(name=g['name']) for g in game_data.get('genres', []) if Genre.objects.filter(name=g['name']).exists()]

                game, created = Game.objects.update_or_create(
                    name=game_data['name'],
                    defaults={
                        'metacritic': game_data.get('metacritic'),
                        'rating': game_data.get('rating'),
                        'rating_top': game_data.get('rating_top'),
                        'released': game_data.get('released'),
                        'background_image': game_data.get('background_image')
                    }
                )

                game.parent_platforms.set(platforms_to_add)
                game.genres.set(genres_to_add)

                if created:
                    self.stdout.write(f"  + Created game: {game.name}")
            
            self.stdout.write(self.style.SUCCESS(f"Successfully seeded {len(games_data)} games."))

        self.stdout.write(self.style.SUCCESS("\nDatabase seeding complete!"))