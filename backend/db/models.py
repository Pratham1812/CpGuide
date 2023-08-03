from django.db import models

class QuestionData(models.Model):
    question_id = models.CharField(max_length=255)
    question = models.TextField()

    
