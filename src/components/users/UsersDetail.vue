<template>
    <div>
        <h1>User Detail</h1>
        <form>
            <fieldset class="form-group">
                <label>Email*</label>
                <div>
                    <input name="email" placeholder="Email" type="text" class="form-control" :disabled="this.isNew ? false : true"
                        v-model="user.email" />
                    <div class="error" v-if="this.validationErrors.email">{{ this.validationErrors.email }}</div>
                </div>
            </fieldset>
            <fieldset class="form-group">
                <label>First Name</label>
                <div>
                    <input name="first_name" placeholder="First Name" type="text" class="form-control"
                        v-model="user.first_name" />
                    <div class="error" v-if="this.validationErrors.first_name">{{ this.validationErrors.first_name }}</div>
                </div>
            </fieldset>
            <fieldset class="form-group">
                <label>Family Name</label>
                <div>
                    <input name="family_name" placeholder="Family Name" type="text" class="form-control"
                        v-model="user.family_name"/>
                    <div class="error" v-if="this.validationErrors.family_name">{{ this.validationErrors.family_name }}</div>
                </div>
            </fieldset>
            <fieldset class="form-group">
                <label>Password</label>
                <div>
                    <input name="password" type="password" class="form-control" 
                        v-model.lazy="user.password" />
                    <div class="error" v-if="this.validationErrors.password">{{ this.validationErrors.password }}</div>
                </div>
            </fieldset>
            <fieldset class="form-group">
                <label>Confirm Password</label>
                <div>
                    <input name="passwordConfirm" type="password" class="form-control" 
                        v-model.lazy="user.passwordConfirm" />
                    <div class="error" v-if="this.validationErrors.passwordConfirm">{{ this.validationErrors.passwordConfirm }}</div>
                </div>
            </fieldset>
            
            <button class="btn btn-primary" @click.prevent="submitted">Save</button>
        </form>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import _ from 'lodash';
    import diff from 'object-diff';

    const initialState = function() { console.log ("init");
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
        } 
    };

    export default {
        data () {
            return initialState();
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
                initialState();
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
                this.fetch(id);
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
            }
        }
    }
</script>

<style scooped>
.error {
    color: red;
}
</style>