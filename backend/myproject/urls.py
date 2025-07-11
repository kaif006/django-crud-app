from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('myapp.urls')),  # Includes ALL your app's API routes
    path('api/auth/', include('rest_framework.urls')),  # Optional: browsable login/logout
]
