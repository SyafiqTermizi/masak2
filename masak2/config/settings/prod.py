from .base import *  # noqa

DEBUG = False

# https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html#settings
DEFAULT_FILE_STORAGE = "utils.storages.MediaStorage"
STATICFILES_STORAGE = "utils.storages.StaticStorage"

AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
AWS_S3_REGION_NAME = "ap-southeast-1"

AWS_STORAGE_BUCKET_NAME = os.environ.get("AWS_STORAGE_BUCKET_NAME")
AWS_DEFAULT_ACL = "public-read"
AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
AWS_S3_FILE_OVERWRITE = True

AWS_IS_GZIPPED = True


STATIC_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{os.environ.get('AWS_STATIC_LOCATION')}/"

MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/media/"

CORS_ORIGIN_ALLOW_ALL = False

INSTALLED_APPS = INSTALLED_APPS + ["storages"]
