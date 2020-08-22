import Vue from 'vue'
import Vuex from 'vuex'
import AuthStore from './modules/authStore'
import BlogStore from './modules/blogStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
    AuthStore,
    BlogStore,
  }
})
