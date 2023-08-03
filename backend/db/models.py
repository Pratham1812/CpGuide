from django.db import models
from django.contrib.auth.models import User

class QuestionData(models.Model):
    topic_id = models.CharField(max_length=3)
    heading = models.CharField(max_length=255)
    sub_heading = models.CharField(max_length=255)
    topic = models.CharField(max_length=255)
    link = models.TextField()
   
class UserProfile(models.Model):
    user = models.CharField(max_length=255)
    topicId = models.CharField(max_length=3)

