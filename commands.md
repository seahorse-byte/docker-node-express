`docker build -t learn-docker-youtube .`
`docker run -v $(pwd):/app:ro -v /app/node_modules --env PORT=4000 -p 3000:4000 -d --name node-app learn-docker-youtube`
`docker rm node-app -f`
