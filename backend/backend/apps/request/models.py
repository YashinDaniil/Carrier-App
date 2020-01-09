from django.db import models


class History(models.Model):
    request_method = models.CharField('request method', max_length = 50)
    request_url = models.CharField('request url', max_length = 200)
    request_headers = models.TextField('request headers')
    request_body = models.TextField('request headers')
    request_time = models.DateField()