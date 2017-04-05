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
            <tr v-for="user in users" :key="user._id">
                <td class="text-center actions">
                    <router-link :to="{ name: 'users.detail', params: {id: user._id} }">
                        <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </router-link>
                    <a @click="onClickRemove(user._id)" class="btn btn-link" v-if="auth_user._id !== user._id">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </a>
                </td>
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
            ]),
            ...mapGetters('auth', {
                auth_user: 'user'
            })
        },
        methods: {
            ...mapActions('users', {
                fetchAll: 'fetchAll',
                removeUser: 'remove'
            }),
            onClickNew() {
                this.$router.push({ name: 'users.detail', params: { id: 'new'} });
            },
            onClickRemove(id) {
                
                var dialogResult = confirm("Please confirm to delete user " + this.users.filter(( u ) => { return u._id === id; })[0].email );
                
                if (dialogResult == true) {
                    let self = this;
                    this.removeUser(id).then( () => {
                        self.fetchAll();
                    });
                }
            }
        }
    }
</script>

<style scooped>
    .users-list td.actions a {
        margin-right: 5px;
        cursor: pointer;
    }
</style>