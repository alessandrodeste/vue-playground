import Vue from 'vue';
import actions from './auth_actions';

const state = {
    authenticated: false,
    user: null,
    lastError: ''
};

const mutations = {
    'AUTH_SIGNIN' (state, user) {
        state.user = user;
        state.authenticated = true;
    },
    'AUTH_SIGNOUT' (state, errorMessage) {
        window.localStorage.removeItem('token');
        state.user = null;
        state.authenticated = false;
        state.lastError = errorMessage ? errorMessage : '';
    }
};

const getters = {
    authenticated: state => {
        return state.authenticated;
    },
    lastError: state => {
        return state.lastError;
    },
    user: state => {
        return state.user;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};