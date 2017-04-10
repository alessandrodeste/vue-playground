<template>
    <div>
        <h1>User Detail</h1>
        <form>
            <input-field :type="'text'" :name="'email'"
                v-model="user.email"
                :title="'Email'"
                :placeholder="'Email'"
                :error="this.validationErrors.email"
                :disabled="this.isNew ? false : true"
            ></input-field>
            
            <input-field :type="'text'" :name="'first_name'"
                v-model="user.first_name"
                :title="'First Name'"
                :placeholder="'First Name'"
                :error="this.validationErrors.first_name"
            ></input-field>
            
            <input-field :type="'text'" :name="'family_name'"
                v-model="user.family_name"
                :title="'Family Name'"
                :placeholder="'Family Name'"
                :error="this.validationErrors.family_name"
            ></input-field>
                
            <input-field :type="'text'" :name="'password'"
                v-model.lazy="user.password"
                :title="'Password'"
                :error="this.validationErrors.password"
            ></input-field>
                
            <input-field :type="'text'" :name="'passwordConfirm'"
                v-model.lazy="user.passwordConfirm"
                :title="'Confirm Password'"
                :error="this.validationErrors.passwordConfirm"
            ></input-field>
            
            <button class="btn btn-primary" @click.prevent="submitted">Save</button>
            <router-link :to="{ name: 'users' }" activeClass="active" class="btn btn-default">Back</router-link>
        </form>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import _ from 'lodash';
    import diff from 'object-diff';
    import Input from '../commons/Input.vue';

    const initialData = function() { 
        return {
            user: {
                _id: '',
                email: '',
                first_name: '',
                family_name: '',
                password: '',
                passwordConfirm: ''
            },
            beforeUser: null,
            isNew: true,
            validationErrors: {}
        };
    };

    export default {
        data () {
            return initialData()
        },
        components: {
            inputField: Input
        },
        computed: {
            ...mapGetters('auth', {
                authUser: 'user'
            }),
            ...mapGetters('users', {
                selectedUser: 'selectedUser'
            })
        },
        created() {
            this.load(this.$route.params.id);
        },
        watch: {
            '$route.params.id'(newId, oldId) {
                this.load(newId);
            },
            selectedUser: function(val) {
                this._assignUserToData(val);
            }
        },
        methods: {
            ...mapActions('users', {
                fetch: 'fetch',
                updateUser: 'update',
                createUser: 'create'
            }),
            load(id) {
                this.isNew = id === 'new' ? true : false;
                
                if (!this.isNew) {
                    this.fetch(id);
                    // after fetch will be populated $store.auth.selectedUser
                } else {
                    this.$data.user = initialData().user;
                }
            },
            _assignUserToData(user) {
                // assign to $data only the used fields
                let self = this;
                _.forEach(this.$data.user, (value, key) => {
                    if (user[key] !== undefined)
                        self.$data.user[key] = user[key];
                });
                // Save the first state, in order to push only the diff
                // JSON is used in order to do not copy references and observables
                this.beforeUser = JSON.parse(JSON.stringify(this.$data.user));
            },
            submitted() {
                const self = this;
                
                if (this.validate()) {
                    if (this.isNew) {
                        // save user
                        this.createUser(this.user).then( (data) => {
                            // go back to users list
                            self.$router.push({ name: 'users' });
                        });
                    } else {
                        // get only touched fields
                        const changedValues = diff(this.beforeUser, this.user);
                        
                        // save user
                        this.updateUser([this.user._id, changedValues]).then( (data) => {
                            // go back to users list
                            self.$router.push({ name: 'users' });
                        });
                    }
                }
            },
            validate() {
                this.validationErrors = {};
                let isValid = true;
                
                if (!this.user.email) {
                    isValid = false;
                    this.validationErrors.email = 'Please enter an email';
                }
                
                if (this.isNew && !this.user.password) {
                    isValid = false;
                    this.validationErrors.password = 'Please enter a password';
                }
                
                if (this.user.password && !this.user.passwordConfirm) {
                    isValid = false;
                    this.validationErrors.passwordConfirm = 'Please enter a password confirmation';
                }
                
                if (this.user.password !== this.user.passwordConfirm) {
                    isValid = false;
                    this.validationErrors.password = 'Passwords must match';
                }
                
                return isValid;
            },
            beforeDestroy: function() {
  	            console.log('beforeDestroy()');
            },
            destroyed: function() {
                console.log('destroyed()');
            }
        }
    }
</script>

<style scooped>
.error {
    color: red;
}
</style>