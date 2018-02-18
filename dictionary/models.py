from django.db import models

# Create your models here.
class Letter(models.Model):
    language = models.CharField(max_length=256)
    char = models.CharField(max_length=256)
    translit = models.CharField(max_length=256)
    name = models.CharField(max_length=256)
    sort_order = models.IntegerField()
    def __str__(self):
        return f"{self.language}: {self.char} - {self.name}"

class Page(models.Model):
    number = models.IntegerField(unique=True)
    
    def get_absolute_url(self):
        return f"/page/{self.number}"
    
    def __str__(self):
        return f"{self.number}"

class Root(models.Model):
    root = models.CharField(max_length=256)
    page_id = models.ForeignKey(Page, on_delete=models.CASCADE)
    letter_id = models.ForeignKey(Letter, on_delete=models.CASCADE)