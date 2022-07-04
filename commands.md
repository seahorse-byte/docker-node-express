```
- Previosly:
docker build -t learn-docker-youtube .`
`docker run -v $(pwd):/app:ro -v /app/node_modules --env PORT=4000 -p 3000:4000 -d --name node-app learn-docker-youtube`
`docker rm node-app -f
```

```
- Now:

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build`
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`
`docker-compose down -v`
```
