<template>
    <div class="users-list">
        <h3>Users List</h3>
        
        <button type="button" @click="onClickNew()" class="btn btn-link">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
        </button>
        
        <table class="table table-striped table-hover">
        <thead>
            <tr>  
                <th></th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users">
                <td>action</td>
                <td>{{ user.email }}</td>
                <td>{{ user.first_name }}</td>
                <td>{{ user.family_name }}</td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        beforeMount() {
            this.fetchAll();
        },
        computed: {
            ...mapGetters('users', [
                'users'
            ])
        },
        methods: {
            ...mapActions('users', {
                fetchAll: 'fetchAll'
            }),
            onClickNew() {
                this.$router.push('/users/new');
            }
        }
    }
</script>

<style scooped>
    .users-list td.actions a {
        margin-right: 15px;
        cursor: pointer;
    }
</style>