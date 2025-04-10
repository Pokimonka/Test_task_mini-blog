from rest_framework import serializers

from blog.models import Comment, Post


class CommentSerializer(serializers.ModelSerializer):
    # провалидировать текст
    class Meta:
        model = Comment
        fields = ['id', 'text', 'date', 'autor', "post_id"]


class PostCreateAndViewSerializer(serializers.ModelSerializer):

    # провалидировать текст
    class Meta:
        model = Post
        fields = '__all__'

#создать сериалазер коментов без пост_ид
class PostDetailSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'text', 'date', 'autor', 'comments']

class PostUpdateSerializer(serializers.ModelSerializer):

    # провалидировать текст
    class Meta:
        model = Post
        fields = ['title', 'text']