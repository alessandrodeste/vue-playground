import Vue from 'vue';

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

const actions = {
    fetchAll: ({ commit }) => {
        
         Vue.http.get('api/secured/users', 
                    {headers: {'authorization': window.localStorage.getItem('token')}})
            .then(response => response.json())
            .then(data => {
                if (data) {
                    commit('USERS_FETCH_ALL', data);
                }
            })
            .catch(response => {
                // commit('USERS_FETCH_ERROR', response.statusText);
            });
    },
    fetch: ({commit}, userId) => {
        
        Vue.http.get('api/secured/users/' + userId, 
                    {headers: {'authorization': window.localStorage.getItem('token')}})
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
    update: ({commit}, params) => {
        const userId = params[0];
        const partialUser = params [1];
        
        Vue.http.put('api/secured/users/' + userId, 
                    partialUser, 
                    {headers: {'authorization': window.localStorage.getItem('token')}})
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // TODO: update list
                }
            })
            .catch(response => {
                // commit('USERS_FETCH_ERROR', response.statusText);
                console.error(response);
            });
    },
    create: ({commit}, user) => {
        
        Vue.http.post('api/secured/users/', 
                    user, 
                    {headers: {'authorization': window.localStorage.getItem('token')}})
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // TODO: update list
                }
            })
            .catch(response => {
                // commit('USERS_FETCH_ERROR', response.statusText);
                console.error(response);
            });
    },
    remove: ({commit}, id) => {
    
        Vue.http.delete('api/secured/users/' + id, 
                    {headers: {'authorization': window.localStorage.getItem('token')}})
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // TODO: update list
                }
            })
            .catch(response => {
                // commit('USERS_FETCH_ERROR', response.statusText);
                console.error(response);
            });
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