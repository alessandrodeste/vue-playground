<template>
    <div>
        <h1>Home screen</h1>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters('auth', [
                'authenticated'
            ])
        }
    }
</script>