<template>
    <div>
        <h1>Signing out...</h1>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        mounted() {
            this.signout().then(() => {
                this.$router.push('/signin');
            });
        },
        methods: {
            ...mapActions('auth', {
                signout: 'signout'
            })
        }
    }
</script>