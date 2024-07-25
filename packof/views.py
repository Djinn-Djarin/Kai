from django.shortcuts import render
from logging import getLogger
from django.http import HttpResponse
from utils.packof import packof_func

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import UploadFileForm
import pandas as pd
import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from .forms import UploadFileForm
import json
from django.urls import reverse
# Create your views here.
def index(request):
    return render(request, 'index.html')

@csrf_exempt
# def upload_file(request):
#     if request.method == 'POST':
#         form = UploadFileForm(request.POST, request.FILES)
#         if form.is_valid():
#             file = request.FILES['file']
#             fs = FileSystemStorage(location='media/uploaded_files/')
#             filename = fs.save(file.name, file)
#             uploaded_file_url = fs.url(filename)
#             return JsonResponse({'success': True, 'uploaded_file_url': uploaded_file_url})
#         else:
#             return JsonResponse({'success': False, 'errors': form.errors})
#     return JsonResponse({'success': False, 'errors': 'Invalid request method.'})

def upload_file(request):
    if request.method == 'POST' and request.FILES['file']:
        uploaded_file = request.FILES['file']
        fs = FileSystemStorage()
        file_name = fs.save(uploaded_file.name, uploaded_file)
        return redirect('file_list')
    else:
        form = UploadFileForm()
    return render(request, 'upload_success.html', {'form': form})


# def packof(request, file_name):
#     # file_path = os.path.join(settings.MEDIA_ROOT, file_name)
#     file_path = os.path.join(settings.MEDIA_ROOT, 'uploaded_files', file_name)
#     df = pd.read_excel(file_path)   
#     file_path = os.path.join(settings.MEDIA_ROOT, file_name)
#     df = pd.read_excel(file_path)
#     # Convert DataFrame to JSON
#     df_json = df.to_json(orient='records')

#     # Pass JSON to context
#     context = {
#         'df_json': df_json
#     }
#     return render(request, 'packof.html', context)

def packof(request, file_name):
    file_path = os.path.join(settings.MEDIA_ROOT, file_name)
    df = pd.read_excel(file_path)
    # Convert DataFrame to JSON
    df_json = df.to_json(orient='records')

    # Pass JSON to context
    context = {
        'df_json': df_json,
        'file_name': file_name
    }
    return render(request, 'packof.html', context)




# def packof_next(request):
#     file_name = 'data.xlsx'
#     file_path = os.path.join(settings.MEDIA_ROOT, 'uploaded_files', file_name)
#     df = pd.read_excel(file_path)

#     df_col = df[['ASIN', 'Product Name']]

#     # Convert DataFrame to JSON
#     df_json = df_col.to_json(orient='records')

#     # Pass JSON to context
#     context = {
#         'df_json': df_json
#     }
#     return render(request, 'packof_next.html', context)

def packof_next(request, file_name):
    file_path = os.path.join(settings.MEDIA_ROOT, file_name)
    df = pd.read_excel(file_path)

    df_col = df[['ASIN', 'Product Name']]

    # Convert DataFrame to JSON
    df_json = df_col.to_json(orient='records')

    # Pass JSON to context
    context = {
        'df_json': df_json,
        'file_name': file_name
    }
    return render(request, 'packof_next.html', context)



@csrf_exempt
def get_color_comb(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        headers = data['headers']        
        rows = data['rows']     
        row_data = [item['PackOf'] for item in rows]

        df = pd.DataFrame(row_data, columns=headers)
    return df
        # print("DataFrame:")
        # print(df)
        # df_json_sm_table = df.to_json(orient='records')

        # context = {
        # 'df_json': df_json_sm_table}
        # return render(request, 'packof_next.html',context)


def f_packof(request, file_name):        
    
        file_path = os.path.join(settings.MEDIA_ROOT, file_name)
        color_comb = get_color_comb()  
        data = packof_func(color_comb, file_path) 

        return render(request, 'packof_next.html',{'dataframe': data.to_html()})












def test2(request):
    return render(request, 'test2.html')


def test1(request):
    return render(request, 'test1.html')