dev:
	meteor \
		--port 3000 \
	  --settings '.config/devel/settings.json'
deploy:
	meteor deploy \
	yourproject.meteor.com \
	--settings '.config/devel/settings.json'

