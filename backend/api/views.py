import requests
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.cache import cache_page

@cache_page(60 * 15)
def get_games(request):

    api_url = 'https://api.rawg.io/api/games'
    params = request.GET.copy()
    params['key'] = settings.RAWG_API_KEY

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        data = response.json()

        return JsonResponse(data)
    
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=503)

@cache_page(60 * 60 * 24)
def get_genres(request):

    api_url = 'https://api.rawg.io/api/genres'
    params = request.GET.copy()
    params['key'] = settings.RAWG_API_KEY

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        data = response.json()

        return JsonResponse(data)
    
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=503)