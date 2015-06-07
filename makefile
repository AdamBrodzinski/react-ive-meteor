dev:
	meteor \
		--port 3000 \
	  --settings '.config/devel/settings.json'
deploy:
	meteor deploy \
	react-ive.meteor.com \
	--settings '.config/devel/settings.json'

