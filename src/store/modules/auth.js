import Vue from 'vue';
import actions from './auth.actions';

const state = {
    authenticated: window.localStorage.getItem('token') ? true : false,
    token: window.localStorage.getItem('token'),
    user: null,
    lastError: ''
};

const mutations = {
    'AUTH_SIGNIN' (state, params) {
        let token = params[0];
        let refresh_token = params[1];
        let user = params[2];
        
        // Save the JWT token
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('refresh_token', refresh_token);
                    
        state.user = user;
        state.authenticated = true;
        state.token = token;
        state.refresh_token = token;
    },
    'AUTH_SIGNOUT' (state, errorMessage) {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('refresh_token');
        
        state.user = null;
        state.authenticated = false;
        state.lastError = errorMessage ? errorMessage : '';
        state.token = "";
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