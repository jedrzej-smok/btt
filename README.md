# btt-app

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



