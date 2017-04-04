import Home from './components/Home.vue';
import SignIn from './components/auth/SignIn.vue';
import SignOut from './components/auth/SignOut.vue';
import SignUp from './components/auth/SignUp.vue';

export const routes = [
    { path: '/', component: Home, meta: { Auth: true } },
    { path: '/signin', component: SignIn },
    { path: '/signout', component: SignOut },
    { path: '/signup', component: SignUp }
];