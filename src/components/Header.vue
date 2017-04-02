<template>
    <nav class="navbar navbar-light">
        <router-link to="/" activeClass="active" class="navbar-brand">Vue Playground</router-link>
        <ul class="nav navbar-nav" v-if="isAuthenticated">
            
            <li class="nav-item">
                <router-link to="/users" activeClass="active" class="nav-link">Users</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/users+" activeClass="active" class="nav-link">Account #username</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/signout" activeClass="active" class="nav-link">Sign Out</router-link>
            </li>
            
        </ul>
        <ul class="nav navbar-nav" v-if="!isAuthenticated">
            <li class="nav-item">
                <router-link to="/signin" activeClass="active" class="nav-link">Sign In</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/signup" activeClass="active" class="nav-link">Sign Up</router-link>
            </li>

        </ul>
      </nav>
</template>

<script>
    //import { mapActions } from 'vuex';

    export default {
        computed: {
            isAuthenticated() {
                return this.$store.getters.authenticated;
            }
        }
    }
</script>