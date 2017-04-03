const state = {
    users: []
};

const mutations = {
    'USERS_FETCH' (state, users) {
        state.users = users;
    }
};

const actions = {
    fetchUsers: ({commit}) => {
        //commit('BUY_STOCK', order);
    },
    fetchUser: ({commit}, userId) => {
        //commit('SET_STOCKS', stocks);
    },
    newUser: ({commit}) => {
        //commit('RND_STOCKS');
    }
};

const getters = {
    users: state => {
        return state.users;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};