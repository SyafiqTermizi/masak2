FROM python:3.8-alpine

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY pyproject.toml ./
RUN apk update \
  && apk add gcc python3-dev musl-dev \
  && apk add postgresql-dev \
  && apk add libffi-dev py-cffi \
  && pip install poetry \
  && poetry install
