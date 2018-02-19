from bakery.views import BuildableDetailView,BuildableListView
from dictionary.models import Letter,Page,Root

IMAGE_URL_PATH = "/static/dictionary/pages/"

class IndexView(BuildableListView):
    template_name = 'base.html'
    model = Page
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        context['hebrew'] = Letter.objects.filter(language='hebrew')
        # context['aramaic'] = Letter.objects.filter(language='aramaic')
        context['img_url'] = IMAGE_URL_PATH + "0_original.png"

        return context

class PageView(BuildableDetailView):
    model = Page
    template_name = 'base.html'
    

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        page = kwargs['object']
        file_name = f"{page.number}_original.png"
        
        context['hebrew'] = Letter.objects.filter(language='hebrew')
        context['aramaic'] = Letter.objects.filter(language='aramaic')
        context['current_page'] = page
        context['next_page'] = get_next_page(page.id)
        context['prev_page'] = get_prev_page(page.id)
        context['img_url'] = IMAGE_URL_PATH + file_name
        context['active_root'] = get_active_root(page.id)
        
        return context

def get_active_root(page_id):
    active_page = Root.objects.filter(page=page_id).first()
    if active_page != None:
        return active_page
    else:
        return get_active_root(page_id - 1)

def get_next_page(current_page):
    if is_valid_page(current_page + 1):
        return Page.objects.get(pk=current_page + 1)
    else: return False

def get_prev_page(current_page):
    if is_valid_page(current_page - 1):
        return Page.objects.get(pk=current_page - 1)
    else: return False

def is_valid_page(page_number):
    if page_number < 1: return False
    if page_number > 1118: return False
    
    return True