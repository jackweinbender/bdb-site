default:

publish:
	# @ echo "Checking HTML..."
	# @ gsutil -m rsync -rdx '*|\..*|.*/\.[^/]*$|.*/\..*/.*$|_.*' dist/  gs://bdb.semitics-archive.org/
	# @ echo "Checking CSS and JS..."
	# @ gsutil -m rsync -rdx '*|\..*|.*/\.[^/]*$|.*/\..*/.*$|_.*' assets/  gs://bdb.semitics-archive.org/assets
	# @ echo "Checking Images..."
	# @ gsutil -m rsync -rdx '\..*|.*/\.[^/]*$|.*/\..*/.*$|_.*' images/  gs://bdb.semitics-archive.org/images
	# @ echo "Done."

build:
	@ echo "Building  Site..."
	@ yarn run start
	@ cp -r assets dist