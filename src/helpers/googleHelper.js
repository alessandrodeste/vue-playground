import Vue from 'vue';

const _installClient = function () {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script')
        script.src = 'https://apis.google.com/js/client.js';
        script.onreadystatechange = script.onload = function () {
            if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                setTimeout(function () {
                    resolve()
                }, 500)
            }
        }
        document.getElementsByTagName('head')[0].appendChild(script);
    })
};

const _initClient = function (client_id) {
    return new Promise(function (resolve, reject) {
        window.gapi.load('auth2', function() {
            window.gapi.auth2.init({ 
                clientId: client_id,
                scope: 'profile email https://www.googleapis.com/auth/plus.login'
            });
            resolve();
        });
    });
};

export default {
    
    init(client_id) {
        return new Promise(function (resolve, reject) {
            if (window.gapi === undefined) {
                _installClient().then(function () {
                    return _initClient(client_id);
                }).then(function () {
                    resolve()
                });
            } else if (window.gapi !== undefined && window.gapi.auth2 === undefined) {
                _initClient(client_id).then(function () {
                    resolve();
                });
            }
        });
    },
    
    // Client-side oauth api call to google
    // - start a popup windows with google credential authentication
    // - return an access_token
    googleSignin(successCallback, failCallback) {
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.grantOfflineAccess({'redirect_uri': 'postmessage', 'scope': 'profile email'}).then(function (response) {
            successCallback(response.code);
        }.bind(this), function (error) {
            failCallback(error);
        }.bind(this))
    },
    
    // After google authentication, validate the user with the backend
    // FIXME: not yet implemented
    googleSigninSuccess(access_token, client_id, callback) {
        Vue.http.post('auth/google/callback', { access_token, client_id, redirect_uri: 'postmessage' }).then(function (response) {
            if (response.body) {
                var data = response.body
                
                // TODO Save to vuex
                //Vue.store.commit('SET_USER', data.user)
                //Vue.store.commit('SET_TOKEN', data.token)
                
                callback(data);
            }
        }, function (response) {
            var data = response.body
            callback(null, data);
        });
    },
    
    googleSignOut() {
        alert("google go out");
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            alert("google is gone");
        });
    }
}