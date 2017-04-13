import Vue from 'vue';

export default {
    fetchAll: ({ commit }, offset) => {
         Vue.http.get('api/secured/users?offset=' + offset.toString()/*, 
                    {headers: {'authorization': window.localStorage.getItem('token')}}*/)
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
        
        Vue.http.get('api/secured/users/' + userId)
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
                    partialUser)
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
                    user)
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
    
        Vue.http.delete('api/secured/users/' + id)
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