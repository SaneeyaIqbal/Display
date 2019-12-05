from django.contrib import admin
from .models import *

# Register your models here.
class StudentAdmin(admin.ModelAdmin):
    list_display =('id','firstName','lastName','skills')
    ordering = ('firstName',)
    search_fields = ['firstName',]


admin.site.register(Student, StudentAdmin)