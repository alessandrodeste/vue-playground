import Vue from 'vue';
import VueResource from 'vue-resource';

import App from './App.vue';
import store from './store/store';

// Init vue-router
import { init as Router } from './routes';
const router = Router(store);

// Init vue-resource
Vue.use(VueResource);
Vue.http.options.root = 'https://nodejs-playground-ade.herokuapp.com';


Vue.http.interceptors.push(function (request, next) {
    // Add JWT to all requests
    request.headers.set('authorization', window.localStorage.getItem('token'));

    next(function (response) {
        //Check for expired token response, if expired, refresh token and resubmit original request
        store.dispatch('auth/checkExpiredToken', { response, request }).then(function(response) {
            return response;
        })
    }.bind(this));
    //next(function (response) {return response;});
}.bind(this));


// Check if was already logged in
const token = window.localStorage.getItem('token');
if (token) {
    store.dispatch('auth/getLoggedUser', token);
} 

// Entry point Vue
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
