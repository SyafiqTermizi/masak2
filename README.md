![Backend Test](https://github.com/SyafiqTermizi/masak2/workflows/Backend%20Test/badge.svg)
![Front End Test](https://github.com/SyafiqTermizi/masak2/workflows/Front%20End%20Test/badge.svg)

# masak2

## Setting Up Locally

### Prerequisites

1. Make sure you have NodeJS and NPM installed
2. Make sure you have Docker and docker-compose installed

### Setting Up Backend App Locally

1. Copy the content `.env.example` file to `.env` and change its values accordingly
2. On your terminal run `docker-compose up`.
3. To run migration, open another terminal and run `docker exec -it <container_name> sh`
4. Then run `poetry run masak2/manage.py migrate`

### Setting Up Frontend

1. Install all front end deps by running `npm install`
2. To start transpiling all `JSX` and `CSS` run `npm run start`

### Running Test On Backend

- While the backend docker container is running, run ``docker exec -it <container_name> sh` on a separate terminae
- Then, type in `poetry run pytest ./masak2 --cov-report html --cov=masak2`

### Running Test For Frontend

```
npm run test
```

### Generating New Django Apps

```
django-admin startapps <APP_NAME>
```

## Preparing for prod

1. Build frontend

```
npm run build
```

2. Collect static

```
docker-compose up
docker exec -it <container_name> sh
poetry run masak2/manage.py collectstatic --settings config.settings.prod
```

3. Build docker container

```
docker build -t docker.pkg.github.com/syafiqtermizi/masak2/masak2:latest -f docker/prod.Dockerfile .
```

4. Push docker container to registry

   - Make sure you are logged in to github (password is your PAT https://github.com/settings/tokens)

   ```
   docker login https://docker.pkg.github.com -u syafiqtermizi
   ```

   - Push the image

   ```
   docker push docker.pkg.github.com/syafiqtermizi/masak2/masak2:latest
   ```
