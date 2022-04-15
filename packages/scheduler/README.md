# Transport logistics Scheduler and Queue

## Table of contents

- [General desciption](#general-desciption)
  - [Table of contents](#table-of-contents)
    - [Other topics](#other-topics)
  - [Development process](#development-process)
    - [Start with](#start-with)
    - [Documentation](#documentation)
  - [Project structure](#project-structure)

## General Desciption

The module that is responsible for sending messages of various types to the queue of events and reminders, as well as letters for the selected subject area

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

### Scripts

- `start:dev` - runs server with nodemon support
- `start:prod` - runs server just as it is using node
- `log` - message version of this package

### Documentation

...to be started

## Project structure

- `common` - invariants and common functions
- `config` - config service with provided function contract
- `errors` - domain specific errors and constructor is provided also
- `scrips` - comman line scripts
- `services` - amqp: publisher, consumer, base one
- `test` - test amqp and scheduler logic
- `utils` - utils for overal project are captured here
