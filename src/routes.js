import Home from './components/Home.vue';
import SignIn from './components/auth/SignIn.vue';
import SignOut from './components/auth/SignOut.vue';
import SignUp from './components/auth/SignUp.vue';

import Users from './components/users/Users.vue';
import UsersList from './components/users/UsersList.vue';
import UsersDetail from './components/users/UsersDetail.vue';

export const routes = [
    { name: 'home', path: '/', component: Home, meta: { Auth: true } },
    { name: 'signin', path: '/signin', component: SignIn },
    { name: 'signout', path: '/signout', component: SignOut },
    { name: 'signup', path: '/signup', component: SignUp },
    { path: '/users', component: Users, children: [
        { name: 'users', path: '', component: UsersList, meta: { Auth: true } },
        { name: 'users.list', path: 'list/:page', component: UsersList, meta: { Auth: true } },
        { name: 'users.detail', path: ':id', component: UsersDetail, meta: { Auth: true } }
    ] }
];