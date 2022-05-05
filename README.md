# btt-app
## Specife .env and backend/.env or docker-compose.yml files with your requirements
### backend/.env:
- variables needed to specify backend/config/db-config.js, generally sequelize setup(only that isn't define in .env or docker-compose.yml, in this case only SQL_DEBUG)
 - variables which had been defined in .env or docker-compose.yml are NOT overwritten again by backend/.env
- if you execute from $backend: node index.js then backend/.env all variables are only present
### .env:
- variables needed to specify environment services in docker-compose.yml, generally mysql connection, ports and docker mapped parameters
- variables which had been defined in docker-compose.yml are NOT overwritten again by .env
### environment docker-compose.yml:
- variables can be directly defined and passed to container
- variables can defined with using variables from .env file
## When use 'docker-compose up' define:
- all variables in .env file
- SQL_DEBUG in backend/.env file (DB_NAME from backend/.env file is irrelevant because docker-compose defined it with using .env file )

## First:
    $ sudo su

## To build and create:
    $ docker-compose create --build

## To run database container:
    $ docker container start  DATABASE-POSTGRES

## To create database:
    $ docker exec -d  DATABASE-POSTGRES  psql  -h localhost -U postgres -c "create database btt_db"

## To run:
    $ docker-compose up -d


## To stop:
    $ docker-compose down

## To remove all: 
    $ docker-compose down --rmi all

## Open application
    http://localhost:6868
    http://localhost:6868/meal/Bean/
    http://localhost:6868/meal/Chicken/
    http://localhost:6868/meal/Duck/img



