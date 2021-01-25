# College App Demo

## Docker initialization (production)

Run demo app using Docker

```sh
$ docker-compose up
```

## Per service initialization (development)

`docker-compose up` must be executed before this type of initialization to initizalize redis and mongo services.

```sh
$ docker-compose up
CTRL + C
$ docker-compose start redis mongo
```

api-service
```sh
$ cd api-service/
$ npm ci
$ npm run start:development
```

client
```sh
$ cd client/
$ npm ci
$ npm run start:development
```

## Open services in browser

Both type of initializations uses the same ports for the services.

Client (React App)
```sh
http://localhost:4100
```

API Service
```sh
http://localhost:4000
```