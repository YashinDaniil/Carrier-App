from django.urls import path

from . import views

urlpatterns = [
  path('', views.req, name = 'req'),
  path('list/', views.get_req_history, name = 'get req list'),
  path('delete_req/', views.delete_request, name = 'dalete req'),
  path('clear_history/', views.clear_history, name = 'clear req'),
]


