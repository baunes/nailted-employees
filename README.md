# Employees SPA

## Run the app

To run the front in docker, without installing nothing more on the local machine just run:

```
docker-compose build
docker-compose up
```

To run everything in local:

```
# 1 Start the server
cd server
npm start

# 2 Start the front
cd client
npm start # This will run angular with a proxy to th server in localhost:3000
```

## Client

To run the front in docker it must be run in docker-compose.

## Api

To run the api in docker, without installing nothing more on the local machine just run:

```
cd server
docker build -t baunes/nailted-employees-api .
docker run -p 3000:3000 -d baunes/nailted-employees-api
```
