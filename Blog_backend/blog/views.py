from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response

from blog.models import Post, Comment
from blog.serializers import (PostCreateAndViewSerializer, PostUpdateSerializer,
                              PostDetailSerializer, CommentSerializer)


# Create your views here.
class PostCreateAndListView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreateAndViewSerializer

class PostDetailViewUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostUpdateSerializer

    def get(self, request, *args, **kwargs):
        queryset = Post.objects.get(id=kwargs['pk'])
        print(queryset)
        serializer_class = PostDetailSerializer(queryset)
        return Response(serializer_class.data)


class CommentView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
