from locust import HttpUser, task ,between
from random import randint

class WebsiteUser(HttpUser):
    wait_time = between(1,2)
    @task(4)
    def view_games_genres(self):
        genre_id = randint(1, 19)
        self.client.get(
            f'/api/games?genres={genre_id}', name='api/games?genres=x'
        )

    @task(2)
    def view_games_platfroms(self):
        parent_platform_id = randint(1, 14)
        self.client.get(
            f'/api/games?parent_platforms={parent_platform_id}', name='api/games?parent_platforms=x'
        )
