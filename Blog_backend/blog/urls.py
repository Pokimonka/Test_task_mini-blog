from django.urls import path

from blog.views import PostCreateAndListView, PostDetailViewUpdateDestroyView, CommentView

urlpatterns = [
    path('posts/',  PostCreateAndListView.as_view()),
    path('posts/<pk>/', PostDetailViewUpdateDestroyView.as_view()),
    path('comments/', CommentView.as_view())
]
