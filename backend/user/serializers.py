from rest_framework import serializers
from django.contrib.auth import get_user_model
# from django.contrib.auth.models import User
from .models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username','id')
        # fields = '__all__'
    
