import Vue from 'vue';
import Vuex from 'vuex';

import users from './modules/users';
import auth from './modules/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        users,
        auth
    }
});

export default store;