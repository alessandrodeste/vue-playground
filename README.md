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
- Google client-side oauth2 authentication is incomplete but implemented

## Build Setup

Install and start the backend services: [nodejs-playground](https://github.com/alessandrodeste/nodejs-playground)

Install and start this application:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# or if you run it on cloud9.io
npm run devc9

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
- refresh list after CRUD operations
- use vue-i18n
- use element-ui for validation and inputs
- select input type for roles
- animations
 
# Thank you time
- [vue-google-auth](https://github.com/simmatrix/vue-google-auth/blob/master/sample.html)
- [vue store with strict mode + two way databinding with mutation](https://ypereirareis.github.io/blog/2017/04/25/vuejs-two-way-data-binding-state-management-vuex-strict-mode/)