from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
@api_view(['GET',])
def api_student_list_view(request):
    student = Student.objects.all()
    if request.method == 'GET':
        serializer = StudentSerializer(student, many=True)
        return Response(serializer.data)

@api_view(['GET',])
def api_student_id_list_view(request, id):
    try:
        student = Student.objects.get(id=id)
    except Student.DoesNotExist:
        return Response(status.HTTP_404_NOT_FOUND)
    else:
        if request.method == 'GET':
            serializer = StudentSerializer(student)
            return Response(serializer.data)

@api_view(['POST',])
def api_create_student_view(request):
    if request.method == 'POST':
        print(request.data)
        serializer = StudentSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            data = {}
            data['Success'] = 'Successfully Created'
            return Response(serializer.data)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

        