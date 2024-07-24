"""
URL configuration for kdashb project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from packof import views

from packof.views import upload_file

from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('packof/', views.packof, name='packof'),    
    path('upload_file/', views.upload_file, name='upload_file'),
    path('view_data/', views.view_data, name='view_data'),
    path('packof_next/', views.packof_next, name='packof_next'),
    path('receive_data/', views.receive_data, name='receive_data'),
    path('test1/', views.test1, name='test1'),
    path('test2/', views.test2, name='test2'),
    


  
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)