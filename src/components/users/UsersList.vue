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
                    <a @click="onClickRemove(user._id)" v-if="auth_user._id !== user._id">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </a>
                </td>
                <td>{{ user.email }}</td>
                <td>{{ user.first_name }}</td>
                <td>{{ user.family_name }}</td>
            </tr>
        </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" v-if="currentPage > 0" @click="goFirstPage()"><a class="page-link" href="#">Start</a></li>
                <li class="page-item" v-if="currentPage > 0" @click="goPreviousPage()"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item" v-if="(users.length - ITEM_PER_PAGE) >= 0"><a class="page-link" @click="goNextPage()">Next</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        data() {
            return {
                ITEM_PER_PAGE: 10
            }
        },
        beforeMount() {
            if (this.$route.params.page) {
                if (this.currentPage !== this.$route.params.page)
                    this.$store.commit('users/SET_PAGE', this.$route.params.page);
                else
                    this.fetchAll(this.$route.params.page * this.ITEM_PER_PAGE);
            } else {
                if (this.currentPage !== 0)
                    this.$store.commit('users/SET_PAGE', 0);
                else
                    this.fetchAll(0);
            }
        },
        computed: {
            ...mapGetters('users', [
                'users',
                'currentPage'
            ]),
            ...mapGetters('auth', {
                auth_user: 'user'
            })
        },
        watch: {
            'currentPage'(newVal) {
                this.fetchAll(newVal * this.ITEM_PER_PAGE);
            }  
        },
        methods: {
            ...mapActions('users', {
                fetchAll: 'fetchAll',
                removeUser: 'remove'
            }),
            onClickNew() {
                this.$router.push({ name: 'users.detail', params: { id: 'new'} });
            },
            goNextPage() {
                this.$router.push({ name: 'users.list', params: { page: this.currentPage + 1} });
                this.$store.commit('users/SET_PAGE', this.currentPage + 1);
            },
            goFirstPage() {
                this.$store.commit('users/SET_PAGE', 0);
            },
            goPreviousPage() {
                this.$store.commit('users/SET_PAGE', this.currentPage - 1);
            },
            onClickRemove(id) {
                
                var dialogResult = confirm("Please confirm to delete user " + this.users.filter(( u ) => { return u._id === id; })[0].email );
                
                if (dialogResult == true) {
                    let self = this;
                    this.removeUser(id).then( () => {
                        self.fetchAll(this.currentPage * this.ITEM_PER_PAGE);
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