<template>
    <nav class="navbar navbar-light">
        
        <router-link :to="{ name: 'home' }" activeClass="active" class="navbar-brand">Vue Playground</router-link>
        
        <ul class="nav navbar-nav" v-if="authenticated">
            <li class="nav-item">
                <router-link :to="{ name: 'users' }" activeClass="active" class="nav-link">Users</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'usersDetail', params: {id: 1} }" activeClass="active" class="nav-link">Account {{ user.username }}</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'signout' }" activeClass="active" class="nav-link">Sign Out</router-link>
            </li>
        </ul>
        
        <ul class="nav navbar-nav" v-if="!authenticated">
            <li class="nav-item">
                <router-link :to="{ name: 'signin' }" activeClass="active" class="nav-link">Sign In</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'signup' }" activeClass="active" class="nav-link">Sign Up</router-link>
            </li>
        </ul>
        
      </nav>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters('auth', [
                'authenticated',
                'user'
            ])
        }
    }
</script>