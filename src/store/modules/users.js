import Vue from 'vue';
import actions from './users.actions';

const state = {
    users: [],
    selectedUser: null
};

const mutations = {
    'USERS_FETCH_ALL' (state, users) {
        state.users = users;
    },
    'USERS_FETCH' (state, user) {
        state.selectedUser = user;
    }
};

const getters = {
    users: state => {
        return state.users;
    },
    selectedUser: state => {
        return state.selectedUser;
    }
    
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};