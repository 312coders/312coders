from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import Post

# Post is using Summernote:
# https://djangocentral.com/integrating-summernote-in-django/

class PostAdmin(SummernoteModelAdmin):
    summernote_fields = ('content',)
    list_display = ('title', 'slug', 'status','created_on')
    list_filter = ("status",)
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}

admin.site.register(Post, PostAdmin)