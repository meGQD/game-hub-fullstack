import requests
from django.conf import settings
from django.core.cache import cache
from django.http import JsonResponse

def get_games(request):
    cache_key = request.get_full_path() 

    cached_data = cache.get(cache_key)
    if cached_data:
        return JsonResponse(cached_data, safe=False)

    api_url = 'https://api.rawg.io/api/games'
    params = request.GET.copy()
    params['key'] = settings.RAWG_API_KEY

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        data = response.json()

        cache.set(cache_key, data)

        return JsonResponse(data)
    
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=503)
    
def get_genres(request):
    cache_key = request.get_full_path() 

    cached_data = cache.get(cache_key)
    if cached_data:
        return JsonResponse(cached_data, safe=False)

    api_url = 'https://api.rawg.io/api/genres'
    params = request.GET.copy()
    params['key'] = settings.RAWG_API_KEY

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        data = response.json()

        cache.set(cache_key, data)

        return JsonResponse(data)
    
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=503)