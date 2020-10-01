FROM python:3.8-alpine

ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH /root/.cache/pypoetry/virtualenvs/masak2-9TtSrW0h-py3.8/bin/python3
WORKDIR /app

COPY . /app
RUN apk update \
    && apk add --no-cache --virtual .build-deps gcc python3-dev musl-dev libffi-dev \
    && apk add py-cffi postgresql-dev \
    && pip install poetry \
    && poetry install --no-dev \
    && poetry add gunicorn
RUN apk del .build-deps
