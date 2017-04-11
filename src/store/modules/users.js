import Vue from 'vue';
import actions from './users.actions';

const state = {
    users: [],
    currentPage: 0,
    selectedUser: null
};

const mutations = {
    'USERS_FETCH_ALL' (state, users) {
        state.users = users;
    },
    'USERS_FETCH' (state, user) {
        state.selectedUser = user;
    },
    'SET_PAGE' (state, page) {
        state.currentPage = page;
    }
};

const getters = {
    users: state => {
        return state.users;
    },
    selectedUser: state => {
        return state.selectedUser;
    },
    currentPage: state => {
        return state.currentPage;
    }
    
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};