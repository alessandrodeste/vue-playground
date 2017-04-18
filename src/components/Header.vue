<template>
    <nav class="navbar navbar-light">
        
        <router-link :to="{ name: 'home' }" activeClass="active" class="navbar-brand">Vue Playground</router-link>
        
        <ul class="nav navbar-nav" v-if="authenticated && user">
            <li class="nav-item">
                <router-link :to="{ name: 'users' }" activeClass="active" class="nav-link">Users</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'users.detail', params: {id: user._id} }" activeClass="active" class="nav-link">Account {{ user.username }}</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'signout' }" activeClass="active" class="nav-link">Sign Out</router-link>
            </li>
            <li class="nav-item">
                
            </li>
        </ul>
        
        <ul class="nav navbar-nav" v-if="!authenticated">
            <li class="nav-item">
                <router-link :to="{ name: 'signin' }" activeClass="active" class="nav-link">Sign In</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'signup' }" activeClass="active" class="nav-link">Sign Up</router-link>
            </li>
            <li class="nav-item" v-show="false">
                <a @click="googleSignin()">Google Login</a>
            </li>
        </ul>
        
      </nav>
</template>

<script>
    import { mapGetters } from 'vuex';
    import GoogleHelper from '../helpers/googleHelper';
    import Config from '../config';

    export default {
        computed: {
            ...mapGetters('auth', [
                'authenticated',
                'user'
            ])
        },
        methods: {
            googleSignin() {
                GoogleHelper.googleSignin(this.googleSigninSuccess, this.googleSigninFail);
            },
            googleSigninSuccess(access_token) {
                GoogleHelper.googleSigninSuccess(access_token, Config.google.client_id, function(data, error) {
                    if (data) {
                        // redirect to the dashboard
                        this.$router.push({ name: 'home' });
                    } else {
                        console.error(error);
                    }
                });
            },
            googleSigninFail(error) {
                console.log(error);
            }
        }
    }
</script>