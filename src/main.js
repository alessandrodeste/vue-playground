import Vue from 'vue';
import VueResource from 'vue-resource';

import App from './App.vue';
import store from './store/store';
import Config from './config';

// Init google api
import GoogleHelper from './helpers/googleHelper';
GoogleHelper.init(Config.google.client_id);

// Init vue-router		
import { init as Router } from './routes';		
const router = Router(store);
 
// Init vue-resource
Vue.use(VueResource);
Vue.http.options.root = Config.baseurl;		

Vue.http.interceptors.push(function (request, next) {		
    		
    // Add JWT to all requests when token is setted		
    if (window.localStorage.getItem('token'))		
        request.headers.set('authorization', window.localStorage.getItem('token'));		
    		
    //Check for expired token response, if expired, refresh token and resubmit original request		
    next(function (response) {		
        return store.dispatch('auth/checkExpiredToken', { response, request }).then(function(response) {
            return response;		
        });
    }.bind(this));
    
}.bind(this));

// Try to get the previous logged user
store.dispatch('auth/getLoggedUser');

// Entry point Vue
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

