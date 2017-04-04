import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './App.vue'
import { routes } from './routes';
import store from './store/store';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'https://nodejs-playground-ade.herokuapp.com';

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { x: 0, y: 0 };
    }
});

router.beforeEach((to, from, next) => {
    if (to.meta.Auth && !store.state.auth.authenticated) {
        next('/signin');
    } else {
        next();
    }
})

// If we have a token, consider the user to be signed in
const token = window.localStorage.getItem('token');
if (token) {
    store.dispatch('auth/getLoggedUser', token);
} 

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
