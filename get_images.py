import wget
import json
from pathlib import Path

with open('_data/pages.json', 'r') as pages_file:
    pages = json.load(pages_file)

    for page in pages:
        emory = page['emory_page']
        section = page['section']
        pid = page['id']
        f = Path(f'images/{section}_{pid}.png')
        if f.is_file(): continue
        else:
            url = f'http://iiif.archivelab.org/iiif/00825376.1523.emory.edu${emory}/full/1024/0/gray.png'
            print(f'\nDownloading: {section}: {pid} @ \n\t{url}')
            wget.download(url, f'images/{section}_{pid}.png')