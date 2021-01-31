# auth-rest-api-app

This is a simple project for train my skills.

This project will demonstrate simple authorizatizaton with jwt tokens.

## Installing

> 1.  Clone the repository:

```console
   foo@bar:~/$ git clone https://github.com/666Xhot666/auth-rest-api-app.git
```

> 2.  Intall dependencies :

```console
  foo@bar:~/$ cd auth-rest-api-app
  foo@bar:~/auth-rest-api-app$ npm run app-install
```

> 3.  In folder config create default.json:

```json
{
  "port": "Your Port",
  "mongo_uri": "your mongo url",
  "jwt_secret": "Your jwt secret",
  "jwt_expiration": "Your expiration time  for jwt tokens",
  "ping": "www.google.com  or your host"
}
```

> 4.  If you want to start app in development mode run:

```console
  foo@bar:~/auth-rest-api-app$ npm run dev
```

> 5.  If you want to start app in production mode run:

```console
  foo@bar:~/auth-rest-api-app$ npm run build
  -----
  -----
  foo@bar:~/auth-rest-api-app$ npm run start
```

## Build With

- [React](https://uk.reactjs.org/) -- Used for build front-end part
- [Typescript](https://www.typescriptlang.org/) -- Used for build back-end part
- [MongoDB](https://www.mongodb.com/) -- Database

## License

ISC
