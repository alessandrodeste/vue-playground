import Vue from 'vue';
import Vuex from 'vuex';

import users from './modules/users';
import auth from './modules/auth';

// Set a debug boolean flag
const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        users,
        auth
    },
    
    // Use strict mode?
    strict: debug
});