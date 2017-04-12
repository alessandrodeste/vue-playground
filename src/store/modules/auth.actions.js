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
                    commit('AUTH_SIGNIN', [token, data.user]);
                } else {
                    commit('AUTH_SIGNOUT', "Error on server response.");    
                }
            })
            .catch(response => {
                commit('AUTH_SIGNOUT', response.statusText);
            });
    },
    
    checkExpiredToken: ({ dispatch }, { response, request }) => {
        
        return new Promise(function(resolve, reject) {
            
            //If token is expired, refresh token, resubmit original request & resolve response for original request
            if(response.status === 401 
                && response.data.error 
                && response.data.error.code === 'TOKEN_EXPIRED' 
                && window.localStorage.getItem('refresh_token')) {
                    
                dispatch('refreshToken', request).then(function(response){
                    resolve(response);
                });
            }
            
            // Otherwise just resolve the current response
            resolve(response);
        });
    },
    refreshToken: ({ dispatch }, request) => {
        return new Promise(function(resolve, reject) {
            
            //Refresh token
            Vue.http.post('auth/token/refresh', 
                    { token: window.localStorage.getItem('refresh_token') }
                    ).then(function (response) {
                
                //Store refreshed token
                window.localStorage.setItem('token', response.data.token);
                
                //Resubmit original request and resolve the response
                Vue.http(request).then(function (newResponse) {
                    resolve(newResponse);
                });
                
            }, function (newResponse) {
                reject(newResponse);
            });
        });
    }

}