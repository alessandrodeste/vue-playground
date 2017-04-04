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
            
        </tbody>
        </table>
    </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters('auth', [
                'authenticated'
            ])
        }
    }
</script>