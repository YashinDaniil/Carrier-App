from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
import json
from ast import literal_eval


@csrf_exempt
def create_collection(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        collection = Collection(collection_name=data['name'])
        collection.save()
        return HttpResponse(json.dumps(
            {"status": 'ok'}
        ))

@csrf_exempt
def edit_collection(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        collection = Collection.objects.get(collection_id=data['id'])
        collection.collection_name = data['name']
        collection.save()
        return HttpResponse(json.dumps({"status": "ok"}))


@csrf_exempt
def delete_collection(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        collection = Collection.objects.get(collection_id=data['id'])
        collection.delete()
        return HttpResponse(json.dumps({"status": "Collection Deleted"}))


def get_collections(request):
    if request.method == 'GET':
        try:
            data = json.loads(request.body)
            collection = Collection.objects.get(collection_id=data['id'])
            return HttpResponse(json.dumps({"collection": collection}))
        except:
            collection = Collection.objects.all()
            try:
                resData = []
                for i in collection:
                    requestCollectionList = []
                    for _ in Request.objects.filter(request_collection=i.pk):
                        requestCollectionList.append(i)

                    resData.append(
                        {
                            'id': i.collection_id,
                            'name': i.collection_name,
                            'requestQuantity': len(requestCollectionList)
                        }
                    )
                return HttpResponse(json.dumps({"collection": resData}))
            except Exception as e:
                return HttpResponse(json.dumps({"collection": [str(e)]}))


def get_collection_quantity(request, collection_id=-1):
    if request.method == 'GET':
        if collection_id != -1:
            requestCollectionList = []
            for _ in Request.objects.filter(request_collection=collection_id):
                requestCollectionList.append('_')
            return HttpResponse(json.dumps({"requestQuantity": len(requestCollectionList)}))



@csrf_exempt
def add_env(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        env = Environment(
                            env_name=data['name'],
                            env_url=data['url'],
                            env_collection=Collection.objects.get(collection_id=data['collection_id'])
                          )
        env.save()
        return HttpResponse(json.dumps(
            {
                "status": "ok",

                'env_id': env.env_id,
                'env_name': env.env_name,
                'url': env.env_url,
                'collection_id': env.env_collection.collection_id,
                'collection_name': Collection.objects.get(collection_id=env.env_collection.collection_id).collection_name
            }
        ))


@csrf_exempt
def edit_env(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        env = Environment.objects.get(env_id=data['id'])
        env.env_name = data['name']
        env.env_url = data['url']
        env.save()
        return HttpResponse(json.dumps({"status": "ok"}))


@csrf_exempt
def delete_env(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        env = Environment.objects.get(env_id=data['id'])
        env.delete()
        return HttpResponse(json.dumps({"status": "ok"}))


def get_env(request, env_id=-1):
    if request.method == 'GET':
        if env_id != -1:
            env = Environment.objects.get(env_id=env_id)
        else:
            env = Environment.objects.all()

        envList = []

        for i in env:
            envList.append(
                {
                    'env_id': i.env_id,
                    'env_name': i.env_name,
                    'url': i.env_url,
                    'collection_id': i.env_collection.collection_id,
                    'collection_name': Collection.objects.get(collection_id=i.env_collection.collection_id).collection_name
                }
            )

        return HttpResponse(json.dumps({"env": envList}))


@csrf_exempt
def add_req_collection(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        req = Request(
                        request_method=data['method'],
                        request_url=data['url'],
                        request_headers=json.dumps(data['headers']),
                        request_body=json.dumps(data['body']),
                        request_collection=Collection.objects.get(collection_id=data['collection'])
                    )
        req.save()
        return HttpResponse(json.dumps({"status": "Request Added"}))


@csrf_exempt
def delete_req_collection(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        req = Request.objects.get(request_id=data['id'])
        req.delete()
        return HttpResponse(json.dumps({"status": "ok"}))


@csrf_exempt
def edit_req_collection(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        req = Request.objects.filter(request_id=data['id'])
        req.update(request_method = data['method'])
        req.update(request_url = data['url'])
        req.update(request_headers = json.dumps(data['headers']))
        req.update(request_body = json.dumps(data['body']))
        req.update(request_collection = Collection.objects.get(collection_id=data['collection']))
        return HttpResponse(json.dumps({"status": "Request Changed"}))


def get_req(request, collection_id=-1):
    if request.method == 'GET':
        if collection_id != -1:
            reqCol = Request.objects.filter(request_collection_id=collection_id)
        else:
            reqCol = Request.objects.all()
        reqColArray = []
        for item in reqCol:
            reqColArray.append({
                "id": item.request_id,
                "url": item.request_url,
                "method": item.request_method,
                "headers": literal_eval(item.request_headers) if item.request_headers != 'null' and item.request_headers != '' else '',
                "body": literal_eval(item.request_body) if item.request_body != 'null' and item.request_body != '' else ''
            })
        return HttpResponse(json.dumps({"reqCol": reqColArray}))