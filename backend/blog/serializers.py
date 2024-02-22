from django.contrib.auth.models import Group, User
from rest_framework import serializers

from .models import Post

# https://blog.logrocket.com/use-django-rest-framework-to-build-a-blog/

class UserSerializer(serializers.HyperlinkedModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'posts']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class PostSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'author', 'updated_on', 'created_on', 'content' , 'status']