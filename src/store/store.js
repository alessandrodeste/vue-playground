import Vue from 'vue';
import Vuex from 'vuex';

import users from './modules/users';
import auth from './modules/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true, // turn off on production
    modules: {
        users,
        auth
    }
});

export default store;