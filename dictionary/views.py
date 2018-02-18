from bakery.views import BuildableListView,BuildableDetailView
from dictionary.models import Letter,Page,Root

# IMAGE_URL_PATH = "/static/dictionary/pages/"
# PAGES_BY_LETTER = Letter.objects.prefetch_related('page_set').all()

class IndexView(BuildableListView):
    model = Letter
    template_name = 'base.html'

class PageView(BuildableDetailView):
    model = Page
    template_name = 'base.html'