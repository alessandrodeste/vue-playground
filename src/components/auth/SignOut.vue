<template>
    <div>
        <h1>Sign out</h1>
    </div>
</template>

<script>
    export default {
        beforeCreate() {
            this.$store.dispatch('signout').then(() => {
                this.$router.push('signin');
            });
        }
    }
</script>