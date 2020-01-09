from django.urls import path

from . import views

urlpatterns = [
  path('get_collections/', views.get_collections, name='get collections'),
  path('get_collection_quantity/<int:collection_id>', views.get_collection_quantity, name='get collections'),
  path('create_collection/', views.create_collection, name='create collection'),
  path('edit_collection/', views.edit_collection, name='edit collection'),
  path('delete_collection/', views.delete_collection, name='delete collection'),

  path('get_env/', views.get_env, name='get env'),
  path('get_env/<int:env_id>', views.get_env, name='get env'),
  path('add_env/', views.add_env, name='add env'),
  path('edit_env/', views.edit_env, name='edit env'),
  path('delete_env/', views.delete_env, name='delete env'),

  path('get_req/', views.get_req, name='get req'),
  path('get_req/<int:collection_id>', views.get_req, name='get req'),
  path('add_req_collection/', views.add_req_collection, name='add req collection'),
  path('delete_req_collection/', views.delete_req_collection, name='delete req collection'),
  path('edit_req_collection/', views.edit_req_collection, name='edit req collection'),
]


