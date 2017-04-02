<template>
    <div>
        <h1>Sign in</h1>
        <form>
            <fieldset class="form-group">
                <label>Email</label>
                <div>
                    <input name="email" placeholder="Email" type="text" class="form-control"
                        @input="userData.email = $event.target.value" />
                </div>
            </fieldset>
            <fieldset class="form-group">
                <label>Password</label>
                <div>
                    <input name="password" placeholder="Password" type="password" class="form-control" 
                        v-model.lazy="userData.password" />
                </div>
            </fieldset>
            <div class="error" v-if="errorMessage">{{ errorMessage }}</div>
            <button class="btn btn-primary"
                @click.prevent="submitted">Sign in</button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        data () {
            return {
                userData: {
                    email: '',
                    password: ''
                }
            }
        },
        computed: {
            errorMessage() {
                return this.$store.getters.lastError;
            }
        },
        methods: {
            ...mapActions({
                signin: 'signin'
            }),
            submitted() {
                this.signin(this.userData).then(() => {
                    // FIXME: redirect if sing in succesful
                    this.$router.push('');
                });
            }
        }
    }
</script>

<style scooped>
.error {
    color: red;
}
</style>