# Setup user-service

In this documentation we will go about how to setup user-service on linux.

## Setup Docker in ubuntu

[Setup Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04). And install `docker-compose` running this command
```
sudo apt install docker-compose
``` 

## Setting up user-service
Inside of linux, create a folder, and create `docker-compose.yml` and `.env` files inside of it.
Copy and paste content from `user-service-docker-compose.yml` into your `docker-compose.yml` file. 
Add these ENV variables to `.env` file for services requied by `user-service`
```sh
DATABASE_NAME='schemes'
DATABASE_USERNAME='dbuser'
ES_JAVA_OPTS='-Xms128m -Xmx128m'
FUSIONAUTH_APP_MEMORY=128m
POSTGRES_PASSWORD='postgres_pass'
POSTGRES_USER='postgres_user'
POSTGRES_DB='postgres_db'
```
Run this command to start required services for `user-service`.
```sh
docker compose up -d db search fusionauth
```

## Setup fusionauth & user-service
Open fusionauth on localhost:9011, setup your account.
Goto `Applications`, and create new application with the name `backend` and copy `Id` for `backend` application. For example - `3c219e58-ed0e-4b18-ad48-f4f92793ae32`.
Using `Id` above, add this line to `.env` which is requried by `user-service`.
```sh
APP_3c219e58_ed0e_4b18_ad48_f4f92793ae32='{"host": "http://fusionauth:9011", "encryption": {"enabled": false}}'
``` 
And then start the `user-service` by this command
Click on user icon in front of `passbook-backend` application to manager roles, and create a new role named `family`.
```sh
docker compose up -d web
```
So, this would start `fusionauth` & `user-service` at ports 9011 & 3005 respectively

## Start Databases required by fid-bff & scheme-manager
```
docker compose up -d bff-db scheme-db
```

## Setting up .env for service with above generated information
```sh
USER_SERVICE=http://localhost:3005
APPLICATION_ID=3c219e58-ed0e-4b18-ad48-f4f92793ae32 # Generated above
JWKS_URI=http://localhost:9011/.well-known/jwks.json # Append /.well-known/jwks.json to fusionauth base URL
```
