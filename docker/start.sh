poetry run masak2/manage.py migrate
poetry run gunicorn --bind 0.0.0.0:80 --chdir /app/masak2 config.wsgi