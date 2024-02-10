from rest_framework import permissions

# https://blog.logrocket.com/use-django-rest-framework-to-build-a-blog/

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.author == request.user