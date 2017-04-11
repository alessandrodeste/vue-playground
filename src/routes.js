import Home from './components/Home.vue';
import SignIn from './components/auth/SignIn.vue';
import SignUp from './components/auth/SignUp.vue';

import Users from './components/users/Users.vue';
import UsersList from './components/users/UsersList.vue';
import UsersDetail from './components/users/UsersDetail.vue';

import Vue from 'vue';
import VueRouter from 'vue-router';

export const routes = [
    { name: 'home', path: '/', component: Home, meta: { Auth: true } },
    { name: 'signin', path: '/signin', component: SignIn },
    { name: 'signout', path: '/signout' },
    { name: 'signup', path: '/signup', component: SignUp },
    { path: '/users', component: Users, children: [
        { name: 'users', path: '', component: UsersList, meta: { Auth: true } },
        { name: 'users.list', path: 'list/:page', component: UsersList, meta: { Auth: true } },
        { name: 'users.detail', path: ':id', component: UsersDetail, meta: { Auth: true } }
    ] }
];

export const init = (store) => {
    Vue.use(VueRouter);
    const router = new VueRouter({
        mode: 'history',
        routes
    });
    
    // Handling authenticated routing path
    router.beforeEach((to, from, next) => {
        // Path that need login but is not logged in
        if (to.meta.Auth && !store.state.auth.authenticated) {
            next('/signin');
        } 
        // Logout action
        else if (to.name === 'signout') {
            store.dispatch('auth/signout');
            next('/signin');
        }
        // If login, forse clean local credential
        else if (to.name === 'signin') {
            store.dispatch('auth/signout');
            next();
        }
        else {
            next();
        }
    });
    
    return router;
}