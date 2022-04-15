## Instructions to run Crisp Backend locally without external dependencies

### 1. Clean up docker

- 1.1. Kill container processes: `docker kill $(docker ps -q)`
- 1.2. Remove containers: `docker rm $(docker ps -a -q)`
- 1.3. (Optional) Remove images: `docker rmi $(docker images -q)`
- 1.4. (Optional) Purge networks and other stuff: `docker system prune -a`
- 1.5. (Optional) Purge volumes: `docker volume prune`

### 2. Make sure your `.env` file contains all configs used in `docker-compose.yaml`

Use `.env.example` as a reference.

### 3. Start app dependencies under docker project

`docker-compose --env-file .env.<env-name e.g: production> up -d`

### 4. Start app

`npm run start:dev`