from django.db import models

# Create your models here.
class Student(models.Model):
    firstName = models.CharField(max_length=35,blank=True)
    lastName = models.CharField(max_length=35,blank=True)
    skills = models.CharField(max_length=40)

    def __str__(self):
        return self.firstName

    def skills_list(self):
        return [x.strip() for x in self.skills.split(',')]