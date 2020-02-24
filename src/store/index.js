import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userdata:{

    }

  },
  mutations: {
    getUserdata(state,payload)
    {
      const {id,username,token}=payload;
      state.userdata={
        id,username,token
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
