import Vue from 'vue';

const state = {
    users: []
};

const mutations = {
    'USERS_FETCH' (state, users) {
        state.users = users;
    }
};

const actions = {
    fetchAll: ({ commit }) => {
        console.log("test");
         Vue.http.get('api/secured/users', {headers: {'authorization': window.localStorage.getItem('token')}})
            .then(response => response.json())
            .then(data => {
                if (data) {
                    commit('USERS_FETCH', data);
                }
            })
            .catch(response => {
                // commit('USERS_FETCH_ERROR', response.statusText);
            });
    },
    fetchUser: ({commit}, userId) => {
        
    },
    newUser: ({commit}) => {
        
    }
};

const getters = {
    users: state => {
        return state.users;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};