from rest_framework import serializers
from .models import *


class StudentSerializer(serializers.ModelSerializer):
    skills_array = serializers.ReadOnlyField(source='skills_list')
    class Meta:
        model = Student
        fields = ('id','firstName','lastName','skills_array')

class CreateStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id','firstName', 'lastName', 'skills')