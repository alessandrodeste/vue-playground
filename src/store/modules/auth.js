import Vue from 'vue';

const state = {
    authenticated: false,
    user: null,
    lastError: ''
};

const mutations = {
    'USER_SIGNIN' (state, user) {
        state.user = user;
        state.authenticated = true;
    },
    'USER_SIGNOUT' (state) {
        state.user = null;
        state.authenticated = false;
    },
    'USER_SIGIN_ERROR' (state, errorMessage) {
        state.user = null;
        state.authenticated = false;
        state.lastError = errorMessage;
    }
};

const actions = {
    signin: ({ commit }, { email, password }) => {
        Vue.http.post('auth/signin', { email, password })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // If request is good...
                    // - Save the JWT token
                    localStorage.setItem('token', data.token);
                    commit('USER_SIGNIN', email);
                }
            })
            .catch(response => {
                localStorage.removeItem('token');
                commit('USER_SIGIN_ERROR', response.statusText);
            });
    },
    signout: ({ commit }) => {
        localStorage.removeItem('token');
        commit('USER_SIGNOUT');
        this.$router.push('signin');
    }
};

const getters = {
    authenticated: state => {
        return state.authenticated;
    },
    lastError: state => {
        return state.lastError;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};