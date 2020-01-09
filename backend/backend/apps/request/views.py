from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
from .models import History
from django.utils import timezone
from ast import literal_eval


def utf8len(s):
    return len(s.encode('utf-8'))

@csrf_exempt
def req(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        headersCheck = False
        bodyCheck = False
        if 'headers' in data:
            headersCheck = True

        if 'body' in data:
            bodyCheck = True
        try:
            if headersCheck == False and bodyCheck == False:
                response = requests.request(
                    method=data['method'],
                    url=data['env'] + data['url']
                )

            if headersCheck == True:
                response = requests.request(
                    method=data['method'],
                    url=data['env'] + data['url'],
                    headers=data['headers'])

            if bodyCheck == True:
                response = requests.request(
                    method=data['method'],
                    url=data['env'] + data['url'],
                    data=json.dumps(data['body']))

            if headersCheck == True and bodyCheck == True:
                response = requests.request(
                    method=data['method'],
                    url=data['env'] + data['url'],
                    headers=data['headers'],
                    data=json.dumps(data['body']))
        except:
            return HttpResponse(json.dumps({'request_status': 'error'}))

        headers = {}
        for key in response.headers._store:
            headers[response.headers._store[key][0]] = response.headers._store[key][1]
        dataResp = {
            'request_status': 'ok',
            'url': response.url,
            'content': json.loads(response.content),
            'time': int(str(response.elapsed.microseconds)[0]+str(response.elapsed.microseconds)[1]+str(response.elapsed.microseconds)[2]),
            'headers': headers,
            'status_code': '{} {}'.format(str(response.status_code), response.reason),
        }
        dataResp['size'] = (utf8len(json.dumps(str(response.headers))) + utf8len(json.dumps(str(response.content)))) / 1000

        a = History(request_method=data['method'], request_url=data['env'] + data['url'], request_headers='' if headersCheck is False else data['headers'], request_body='' if bodyCheck is False else data['body'], request_time=timezone.now())
        a.save()
        requestData = {
            'id': a.id,
            'method': a.request_method,
            'url': a.request_url,
            'headers': '' if a.request_headers == '' else literal_eval(str(a.request_headers)),
            'body': '' if a.request_body == {} else a.request_body,
            'time': str(a.request_time)
        }
        dataResp['requestData'] = requestData
        return HttpResponse(json.dumps(dataResp))


@csrf_exempt
def delete_request(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        req = History.objects.get(id = data['id'])
        req.delete()
        return HttpResponse(json.dumps({"status": "ok"}))

@csrf_exempt
def clear_history(request):
    if request.method == 'POST':
        reqs = History.objects.all()
        reqs.delete()
        return HttpResponse(json.dumps({"status": "All history was deleted"}))


def get_req_history(request):
    if request.method == 'GET':
        respList = []
        for req in History.objects.all().order_by('-id'):
            respList.append({
                "id": req.id,
                "url": req.request_url,
                "method": req.request_method,
                "headers": literal_eval(req.request_headers) if req.request_headers != '' else '',
                "body": literal_eval(req.request_body) if req.request_body != '' else '',
                "time": str(req.request_time)
            })

        return HttpResponse(json.dumps({'reqList': respList}))