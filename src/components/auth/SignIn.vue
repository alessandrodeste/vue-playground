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
            <div class="error" v-if="lastError">{{ lastError }}</div>
            <button class="btn btn-primary"
                @click.prevent="submitted">Sign in</button>
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
                    password: ''
                }
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
                signin: 'signin'
            }),
            submitted() {
                this.signin(this.userData);
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