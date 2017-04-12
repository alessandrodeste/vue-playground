import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './App.vue';
import { routes } from './routes';
import store from './store/store';

// Init vue-resource
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:8080';

// Init vue-router
Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes
});

// Handling authenticated routing path
router.beforeEach((to, from, next) => {
    if (to.meta.Auth && !store.state.auth.authenticated) {
        next('/signin');
    } else {
        next();
    }
})

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
