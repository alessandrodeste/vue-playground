<template>
    <div>
        <h1>Sign up</h1>
        <form>
            <fieldset class="form-group">
                <label>Email</label>
                <div>
                    <input name="email" placeholder="Email" type="text" class="form-control"
                        @input="userData.email = $event.target.value" />
                    <div className="error" v-if="this.formValidationError.email">{{ this.formValidationError.email }}</div>
                </div>
            </fieldset>
            <fieldset class="form-group">
                <label>Password</label>
                <div>
                    <input name="password" type="password" class="form-control" 
                        v-model.lazy="userData.password" />
                    <div className="error" v-if="this.formValidationError.password">{{ this.formValidationError.password }}</div>
                </div>
            </fieldset>
            <fieldset class="form-group">
                <label>Confirm Password</label>
                <div>
                    <input name="passwordConfirm" type="password" class="form-control" 
                        v-model.lazy="userData.passwordConfirm" />
                    <div className="error" v-if="this.formValidationError.passwordConfirm">{{ this.formValidationError.passwordConfirm }}</div>
                </div>
            </fieldset>
            <div class="error" v-if="lastError">{{ lastError }}</div>
            <button class="btn btn-primary"
                @click.prevent="submitted">Sign up</button>
        </form>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        
        data () {
            return {
                userData: {
                    email: '',
                    password: '',
                    passwordConfirm: ''
                },
                formValidationError: {}
            }
        },
        computed: {
            ...mapGetters('auth', [
                'lastError',
                'authenticated'
            ])
        },
        methods: {
            ...mapActions('auth', {
                signup: 'signup'
            }),
            submitted() {
                if (this.validate()) {
                    this.signup(this.userData);
                }
            },
            validate() {
                this.formValidationError = {};
                let isValid = true;
                
                if (!this.userData.email) {
                    isValid = false;
                    this.formValidationError.email = 'Please enter an email';
                }
                
                if (!this.userData.password) {
                    isValid = false;
                    this.formValidationError.password = 'Please enter a password';
                }
                
                if (!this.userData.passwordConfirm) {
                    isValid = false;
                    this.formValidationError.passwordConfirm = 'Please enter a password confirmation';
                }
                
                if (this.userData.password !== this.userData.passwordConfirm) {
                    isValid = false;
                    this.formValidationError.password = 'Passwords must match';
                }
                
                return isValid;
            }
        },
        watch: {
            authenticated: function (newval) {
                if (newval) {
                    this.$router.push('/');
                }
            }
        }
    }
</script>

<style scooped>
.error {
    color: red;
}
</style>