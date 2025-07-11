from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, register_user
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('register/', register_user, name='register'),   # /api/register/
    path('token/', obtain_auth_token, name='api_token_auth'),  # /api/token/
]

urlpatterns += router.urls  # Adds /tasks/
