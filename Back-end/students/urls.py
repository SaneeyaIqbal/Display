from .views import *
from django.urls import path


app_name = 'students'

urlpatterns = [
    path('student/', api_student_list_view, name='student_list'),
    path('student/<int:id>/', api_student_id_list_view, name='student_id_list'),
    path('student/create/',api_create_student_view, name='student_create_list'),
    path('<int:id>/delete/',api_student_delete_view,name='student_delete_list'),
]