from django.shortcuts import render
from logging import getLogger
from django.http import HttpResponse
from utils.packof import df
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import UploadFileForm
import pandas as pd
import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from .forms import UploadFileForm
import json

# Create your views here.
def index(request):
    return render(request, 'index.html')

@csrf_exempt
def upload_file(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            fs = FileSystemStorage(location='media/uploaded_files/')
            filename = fs.save(file.name, file)
            uploaded_file_url = fs.url(filename)
            return JsonResponse({'success': True, 'uploaded_file_url': uploaded_file_url})
        else:
            return JsonResponse({'success': False, 'errors': form.errors})
    return JsonResponse({'success': False, 'errors': 'Invalid request method.'})


def handle_uploaded_file(file):
    upload_path = os.path.join(settings.MEDIA_ROOT, 'uploaded_files/', file.name)
    with open(upload_path, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)


def process_uploaded_file(request):
    # Example file name, you might want to pass this dynamically
    file_name = 'data.xlsx'
    file_path = os.path.join(settings.MEDIA_ROOT, 'uploaded_files', file_name)

    if os.path.exists(file_path):
        try:
            df = pd.read_excel(file_path)
            df_columns = df.columns
            # Process the dataframe (example: convert to JSON and return)
            data = df.to_json(orient='records')
            data_columns = df_columns.to_json(orient='records')

            context = {'df_json': data,
                       'data_columns': data_columns}

            return render(request, 'index.html', context)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'File does not exist'}, status=404)


def view_data(request):
    # Example DataFrame

    file_name = 'data.xlsx'
    file_path = os.path.join(settings.MEDIA_ROOT, 'uploaded_files', file_name)
    df = pd.read_excel(file_path)

    # Convert DataFrame to JSON
    df_json = df.to_json(orient='records')

    # Pass JSON to context
    context = {
        'df_json': df_json
    }

    return render(request, 'view_data.html', context)


def packof(request):
    # Example DataFrame

    file_name = 'data.xlsx'
    file_path = os.path.join(settings.MEDIA_ROOT, 'uploaded_files', file_name)
    df = pd.read_excel(file_path)

    # Convert DataFrame to JSON
    df_json = df.to_json(orient='records')

    # Pass JSON to context
    context = {
        'df_json': df_json
    }

    return render(request, 'packof.html', context)


def packof_next(request):
    file_name = 'data.xlsx'
    file_path = os.path.join(settings.MEDIA_ROOT, 'uploaded_files', file_name)
    df = pd.read_excel(file_path)

    df_col = df[['ASIN', 'Product Name']]

    # Convert DataFrame to JSON
    df_json = df_col.to_json(orient='records')

    # Pass JSON to context
    context = {
        'df_json': df_json
    }

    return render(request, 'packof_next.html', context)

@csrf_exempt
def receive_data(request):
    print(request.method)
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)

        headers = data['headers']
        headers = headers[1:]
        print("this is header",headers)
        rows = data['rows']
        print("these are rows",rows)

        df = pd.DataFrame(rows, columns=headers)
        df.to_csv('output.csv', index=False)
        print("DataFrame:")
        print(df)
        df_json = df.to_json(orient='records')

        context = {
        'df_json': df_json}
        return HttpResponse(context)






def test2(request):
    return render(request, 'test2.html')


def test1(request):
    return render(request, 'test1.html')