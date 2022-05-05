# btt-app
## Table of contents
* [Requirements](#requirements)
* [Install and run](#install-and-run)

## Requirements
<pre>
- <a href="https://docs.docker.com/engine/install/" title="download">download</a> and install Docker
</pre>


## Install and run:
## First (on Linux):
    $ sudo su

## To build and create:
    $ docker-compose create --build

## To run database container:
    $ docker container start  DATABASE-POSTGRES

## To create database:
    $ docker exec -d  DATABASE-POSTGRES  psql  -h localhost -U postgres -c "create database btt_db"

## To run app:
    $ docker-compose up -d


## To stop app:
    $ docker-compose down

## To remove all: 
    $ docker-compose down --rmi all

## Open application
    http://localhost:6868
    http://localhost:6868/meal/Bean/
    http://localhost:6868/meal/Chicken/
    http://localhost:6868/meal/Duck/img



