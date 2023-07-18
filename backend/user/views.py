from urllib.request import Request
from rest_framework import status,authentication,permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404, JsonResponse
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.backends import TokenBackend
from .models import JsonHandler
import json
import os
from django.conf import settings
import base64
        
class SignUp(APIView):
    def get(self,request):
        return Response('it works',status=200)
    def post(self, request):
        
        fname = request.data['fname']
        lname = request.data['lname']
        username = request.data['username']
        email = request.data['email']
        password = request.data['password']
        
        try:
            user = User.objects.get(username=username)
            return Response("Already signed up",status = 300)

        except User.DoesNotExist:
            user = User.objects.create_user(username,email,password)
            user.last_name = lname
            user.first_name = fname
            
            user.save()
            
            with open(os.path.join(settings.BASE_DIR, 'data_finally_links.json')) as f:
                 txt = f.read()
            print(txt)     
            prefs = JsonHandler(username=username,data=json.loads(txt))
            prefs.save()
            return Response("sorted", status=200)
                
       
class profile(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self ,request):
            
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            data = {'token': token}
        
            valid_data = TokenBackend(algorithm='HS256').decode(token,verify=False)
        
            user = User.objects.get(username=request.user)
            prefs = JsonHandler.objects.get(username=request.user)
            data = json.dumps(prefs.data["links"])
            
            
            test = {
                 "username":user.username,
                 "email":user.email,
                 "fname":user.first_name,
                 "lname":user.last_name,
                 "links":data
            }
            return Response(json.dumps(test))
    def patch(self,request):
         data = json.loads(request.body.decode())
         prefs = JsonHandler.objects.get(username=request.user)
         prefs.data = data
         prefs.save()
         return Response("EMU AUTH")