# Transport logistics Server 

## Table of contents

- [General description](#general-desciption)
  - [Table of contents](#table-of-contents)
    - [Other topics](#other-topics)
  - [Development process](#development-process)
    - [Start with](#start-with)
    - [Documentation](#documentation)
  - [Project structure](#project-structure)

## General Description

The server that handles requests, domain modeling located here also implemented part of the business logic of the selected subject area, namely cargo transportation


## Development Process

## Instructions to run Backend locally without external dependencies

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

### Setting up your environment

After installing the above, you need to perform the following steps to set your development machine:

1. Do not forget to run `npm install` to install the required dependencies.
2. Use `.env.example` file as guidance and set up the environment variables listed there.
   Reach out to others to get the necessary configurations. _This is required to set up the app!_
3. Run `docker-compose --env-file .env.<env-name e.g: production> up` in your command shell to spin up local db instances.
4. Run

   Note that this doest not run migrations and synchronizes db instance on startup. If you want to run it,
   additionally:
   
   - `yarn migrate`.

### Scripts

- `start:dev` - runs server with nodemon support
- `start:prod` - runs server just as it is using node
- `log` - message version of this package
- `migrate` - run latest or existed/not applied ones
- `test`: run functional/integration tests
- `types`: transpile types for js

### Documentation

Pay attention on apidocs folder with openapi separeted files using swagger-cli

## Project structure

- `apidocs` - openapi support, schemas using swagger cli
- `common` - invariants and common functions
- `config` - config service with provided function contract
- `consts` - general constants for subject domain
- `fixtures` - randon fixtures/stubs using library chance
- `errors` - domain specific errors and constructor is provided also
- `logger` - logger infra of pino usage
- `scrips` - comman line scripts
- `persistent` - database access layer
- `snippets` - short comman line commans for project set up and support
- `types` - typescript typings for existed javascript functions
- `src` - guards, modules, repos, routes, services, shared modules, server and app as separated ones 
- `test` - test amqp and scheduler logic
- `utils` - utils for overal project are captured here
