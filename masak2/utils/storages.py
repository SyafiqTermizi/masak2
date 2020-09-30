import os
from storages.backends.s3boto3 import S3Boto3Storage


class StaticStorage(S3Boto3Storage):
    location = os.environ.get("AWS_STATIC_LOCATION")
    default_acl = "public-read"


class MediaStorage(S3Boto3Storage):
    location = "media"
    default_acl = "public-read"
    file_overwrite = False
