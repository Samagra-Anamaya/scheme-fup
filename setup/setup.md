# Service Setup

In this documentation we will go about how to setup scheme-fup service.

## Setup Docker on ubuntu

[Setup Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04). And install `docker-compose` running this command
```
sudo apt install docker-compose
``` 

## Setting up user-service
Inside of linux, create a folder, and create `docker-compose.yml` and `.env` files inside of it.
Copy and paste content from `user-service-docker-compose.yml` into your `docker-compose.yml` file. 
Add these ENV variables to `.env` file for services requied by `fusionauth`
```sh
DATABASE_NAME='schemes'
DATABASE_USERNAME='dbuser'
ES_JAVA_OPTS='-Xms128m -Xmx128m'
FUSIONAUTH_APP_MEMORY=128m
POSTGRES_PASSWORD='postgres_pass'
POSTGRES_USER='postgres_user'
POSTGRES_DB='postgres_db'
```
Run this command to start `fusionauth`.
```sh
docker-compose up -d db search fusionauth
```

## Setup fusionauth & user-service
Open fusionauth on localhost:9011, setup your account.
Goto `Applications`, and create new application with the name `backend` and copy `Id` for `backend` application. For example - `3c219e58-ed0e-4b18-ad48-f4f92793ae32`. This is our `applicationId`.
Goto `Settings -> API Keys` on FusionAuth console, and create a new API Key. Copy the generated key. For example - `8fNObjASNyJ1ryo7sUPKCdpD9vL1A2c8kPkFcNkZ9YI68_HpG1Xsgv2s`. This is our `apiKey`.
Using `applicationId` & `apiKey` above, along with any random `salt` add this line to `.env` which is requried by `user-service`.
```sh
APP_6f546091_1d96_463e_8de2_323f1da7cb98={"host": "http://fusionauth:9011", "apiKey": "8fNObjASNyJ1ryo7sUPKCdpD9vL1A2c8kPkFcNkZ9YI68_HpG1Xsgv2s", "salt": "jut4llLCCWp7HOISBffmIZluFYOW4hLzHxlijgb3mY8Z-Jg307rux0W-", "encryption": {"enabled": false}}
``` 
And then start the `user-service` by this command
```sh
docker-compose up -d web
```
This would start `fusionauth` & `user-service` at ports 9011 & 3005 respectively

## Setup scheme-fup service
Clone this repo on your local machine using, and change directory to project root.
```
git clone git@github.com:Samagra-Anamaya/scheme-fup.git
cd scheme-fup
```

## Create .env required to start service
```sh
DATABASE_URL="postgresql://postgres:postgres@localhost:5555/postgres?schema=public" # Database to store scheme information in. Update URL in case you want to connect to some existing database.

USER_SERVICE="http://localhost:3005" # replace this with hosted user-service url, if not on local
APPLICATION_ID="6f546091-1d96-463e-8de2-323f1da7cb98" # applicationId generated in above steps
JWKS_URI="http://localhost:9011/.well-known/jwks.json" # replace this with hosted fusionauth url, and append /.well-known/jwks.json
```

## Start Databases required by scheme-fup service (optional)
If you want to run database on local machine. Use docker-compose to start the database, and update `DATABASE_URL` in .env accordingly.
```
docker-compose up -d postgres
```

## Starting scheme-fup service
Have [nodejs](https://nodejs.org/en/download/package-manager) installed, along with [yarn](https://classic.yarnpkg.com/lang/en/docs/install) package manager.
Having installed required binaries. Run these commands
```
yarn install
yarn add @prisma/client
npx prisma generate
npx prisma migrate dev
yarn start:dev
```

This would start your `scheme-fup` service on port 3000.
Swagger docs can be accessed through `http://localhost:3000/api`
