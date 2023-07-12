from urllib.request import Request
from rest_framework import status,authentication,permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404, JsonResponse
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.backends import TokenBackend

# class SignIn(APIView):
#     def get(self,request):
#         return Response('it works',status=200)
#     def post(self, request):
#         data = JSONParser().parse(request)
#         username = data['username']
#         password = data['password']
        
            
#         user = authenticate(request,username=username,password = password)

#         if user is not None:
#             # if(request.session.test_cookie_worked()):
#             #     request.session.delete_test_cookie()
#             #     login(request,user)
#             #     return Response("CIAO",status=200)
#             # else:
#             #     return Response("Enable cookies",status=400)
#             login(request,user)
#             print(request.session)
#             return Response(request.user)
#         else:
#             return Response("Invalid credentials/user does not exist",status=400)
        
        

class SignUp(APIView):
    def get(self,request):
        return Response('it works',status=200)
    def post(self, request):
        
        fname = request.POST['fname']
        lname = request.POST['lname']
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        
        try:
            user = User.objects.get(username=username)
            return Response("Already signed up",status = 300)

        except User.DoesNotExist:
            user = User.objects.create_user(username,email,password)
            user.last_name = lname
            user.first_name = fname
            
            user.save()
            return Response("sorted", status=200)
                
       
class profile(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self ,request):
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            data = {'token': token}
        
            valid_data = TokenBackend(algorithm='HS256').decode(token,verify=False)
            user = valid_data['user_id']
            # request.user_id = user
            print(request.user)
            return Response("congo")
        