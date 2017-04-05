import Vue from 'vue';


export default {
    
    signin: ({ commit, dispatch }, { email, password }) => {
        Vue.http.post('auth/signin', { email, password })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    dispatch('getLoggedUser', data.token);
                } else {
                    commit('AUTH_SIGNOUT', "Error on server response.");    
                }
            })
            .catch(response => {
                commit('AUTH_SIGNOUT', response.statusText);
            });
    },
    
    signup: ({ commit, dispatch }, { email, password }) => {
        Vue.http.post('auth/signup', { email, password })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    dispatch('getLoggedUser', data.token);
                } else {
                    commit('AUTH_SIGNOUT', "Error on server response.");    
                }
            })
            .catch(response => {
                commit('AUTH_SIGNOUT', response.statusText);
            });
    },
        
    signout: ({ commit }) => {
        commit('AUTH_SIGNOUT');
    },

    getLoggedUser: ({ commit }, token) => {
        Vue.http.get('auth/loggedin', {headers: {'authorization': token}})
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // Save the JWT token
                    window.localStorage.setItem('token', token);
                    commit('AUTH_SIGNIN', data.user);
                } else {
                    commit('AUTH_SIGNOUT', "Error on server response.");    
                }
            })
            .catch(response => {
                commit('AUTH_SIGNOUT', response.statusText);
            });
    }

}