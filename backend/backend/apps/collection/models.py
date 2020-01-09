from django.db import models


class Collection(models.Model):
    collection_id = models.AutoField('collection id', primary_key=True)
    collection_name = models.CharField('collection name', max_length = 200)

class Environment(models.Model):
    env_id = models.AutoField('environment id', primary_key=True)
    env_name = models.CharField('environment name', max_length = 200)
    env_url = models.CharField('environment url', max_length = 200)
    env_collection = models.ForeignKey(Collection, on_delete=models.CASCADE)


class Request(models.Model):
    request_id = models.AutoField('request id', primary_key=True)
    request_method = models.CharField('request method', max_length = 50)
    request_url = models.CharField('request url', max_length = 200)
    request_headers = models.TextField('request headers')
    request_body = models.TextField('request headers')
    request_collection = models.ForeignKey(Collection, on_delete=models.CASCADE)