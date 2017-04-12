# vue-playground

> A Vue.js project

## What contain this project?

- The project is based on vue-cli init template 'webpack-simple'
- State management and actions with [Vuex](https://github.com/vuejs/vuex)
- Routing with [vue-router](https://github.com/vuejs/vue-router)
- Http requests with [vue-resource](https://github.com/pagekit/vue-resource)
- CRUD operation on users list
- Basic authentication with JWT
- Basic form validation

## Build Setup

Install and start the backend services: [nodejs-playground](https://github.com/alessandrodeste/nodejs-playground)

Install and start this application:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

To configure the backend endpoint: 

``` js
// File: /src/main.js:
Vue.http.options.root = 'http://localhost:8080';
```

# TODO

- loaders
- smart refresh item in list after update/create
- use vue-i18n
- use element-ui for validation and inputs
- select input type for roles