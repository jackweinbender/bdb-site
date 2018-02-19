default:

publish:
	@ echo "Checking HTML..."
	@ gsutil -m rsync -rdx 'static/dictionary/pages/*|\..*|.*/\.[^/]*$|.*/\..*/.*$|_.*' build/  gs://bdb.semitics-archive.org/
	@ echo "Checking CSS and JS..."
	@ gsutil -m rsync -rdx 'pages/*|\..*|.*/\.[^/]*$|.*/\..*/.*$|_.*' static/dictionary/  gs://bdb.semitics-archive.org/static/dictionary/
	@ echo "Checking Images..."
	@ gsutil -m rsync -rdx '\..*|.*/\.[^/]*$|.*/\..*/.*$|_.*' static/dictionary/pages/  gs://bdb.semitics-archive.org/static/dictionary/pages
	@ echo "Done."

build:
	@ echo "Building  Site..."
	@ python3 manage.py build --skip-static
	@ mkdir build/static/ && mkdir build/static/dictionary
	@ cp static/dictionary/styles.css build/static/dictionary/
	@ cp static/dictionary/scripts.js build/static/dictionary/

build-css:
	@echo "Pushing CSS..."
	gsutil cp static/dictionary/styles.css gs://bdb.semitics-archive.org/static/dictionary/styles.css