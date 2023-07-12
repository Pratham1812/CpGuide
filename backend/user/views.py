from urllib.request import Request
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404, JsonResponse
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from .models import User
from rest_framework.parsers import JSONParser
from hashlib import sha256

class SignIn(APIView):
    def get(self,request):
        return Response('it works',status=200)
    def post(self, request):
        data = JSONParser().parse(request)
        username = data['username']
        password = data['password']
        try:
            user = User.objects.get(username=username)
            user_data = UserSerializer(user).data
            if(user_data['password'] == password):
                return Response('logged in',status=201)
            return Response('Invalid Credentials', status=400)
        except User.DoesNotExist:
            return Response('Invalid Credentials', status=400)
        
        

class SignUp(APIView):
    def get(self,request):
        return Response('it works',status=200)
    def post(self, request):
        data = JSONParser().parse(request)
        username = data['username']
        password = data['password']
        fname = data['fname']
        lname = data['lname']
        email = data['email']
         
        try:
            user = User.objects.get(username=username)
            return Response("Already signed up",status = 300)

        except User.DoesNotExist:

            serializer = UserSerializer(data=data)
            if(serializer.is_valid()): 
                serializer.save()
                return Response('signed up', status=200)
            return Response(serializer.errors, status=400)
    
