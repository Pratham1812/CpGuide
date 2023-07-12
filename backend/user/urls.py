
from django.urls import path,include
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [

    path('/login',TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('/refresh',TokenRefreshView.as_view(), name='token_refresh_pair'),
    path('/signup',views.SignUp.as_view()),
    path('/profile',views.profile.as_view())
    
]


urlpatterns = format_suffix_patterns(urlpatterns)