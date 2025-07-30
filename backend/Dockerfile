FROM python:3.11

WORKDIR /app

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

RUN DJANGO_SETTINGS_MODULE='gamehub.settings.prod' \
    SECRET_KEY=dummy \
    RAWG_API_KEY=dummy \
    FRONTEND_URL=dummy \
    REDIS_LOCATION=dummy \
    ALLOWED_HOSTS='*' \
    DB_NAME=dummy \
    DB_USER=dummy \
    DB_PASSWORD=dummy \
    DB_HOST=dummy \
    DB_PORT=dummy \ 
    python manage.py collectstatic --noinput

EXPOSE 8000

CMD sh -c "python wait_for_db.py && \
    python wait_for_redis.py && \
    python manage.py migrate && \
    gunicorn gamehub.wsgi --bind 0.0.0.0:8000 --log-level=debug"