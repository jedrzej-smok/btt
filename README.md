# template-app5
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

## To run:
    $ docker-compose up

## To run and rebuild image:
    $ docker-compose up --build

## To stop:
    $ docker-compose down

## To remove all: 
    $ docker-compose down --rmi all
## Server api listen local(host) on: localhost:6868



## After first docker-compose up --build and before first executing application has to create database:

### Option 1:
    $ sudo docker exec -it  database-pg  psql  -h localhost -U postgres -c "create database btt_db"
    
    $ docker-compose up --build

## Open application
    http://localhost:6868


