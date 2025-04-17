from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField(max_length=2500, null=True, blank=True)
    date = models.DateTimeField(auto_now = True)
    autor = models.CharField(max_length=50)

    class Meta:
        verbose_name = 'Пост'
        verbose_name_plural = 'Посты'

    def __str__(self):
        return self.title

class Comment(models.Model):
    autor = models.CharField(max_length=50)
    text = models.TextField(max_length=200, null=True, blank=True)
    date = models.DateTimeField(auto_now = True)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'

    def __str__(self):
        return self.post_id