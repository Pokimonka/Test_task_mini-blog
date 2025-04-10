from django.contrib import admin

from blog.models import Post, Comment


# Register your models here.
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'text', 'date', 'autor']
    list_filter = ['date', 'autor']

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'autor', 'text', 'date']
    list_filter = ['date', 'autor']