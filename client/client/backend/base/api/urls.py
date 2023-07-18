from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from . import serializers

urlpatterns = [
    path('', views.getRoutes),
    path('token/', serializers.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

