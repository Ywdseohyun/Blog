import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const types = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_USER: "SET_USER"
}

const moduleA = {
  state: {
    // 是否授权
    isAuthenticated: false,
    user: {}
  },
  
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user
  },
  
  mutations: {
    [types.SET_AUTHENTICATED](state, isAuthenticated) {
      if (isAuthenticated) state.isAuthenticated = isAuthenticated;
      else state.isAuthenticated = false;
    },
  
    [types.SET_USER](state, user){
      if (user) state.user = user;
      else state.user = {};
    }
  },
  
  actions: {
    setAuthenticated: ({ commit }, isAuthenticated) => {
      commit(types.SET_AUTHENTICATED, isAuthenticated);
    },
    setUser: ({ commit }, user) => {
      commit(types.SET_USER, user);
    },
    clearCurrentState: ({ commit }) => {
      commit(types.SET_AUTHENTICATED, false);
      commit(types.SET_USER, null);
    }
  }
}

const moduleB = {
  state: {},
  getters: {},
  actions: {},
  mutations: {}
}
export default new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})