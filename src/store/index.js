import Vue from "vue";
import Vuex from "vuex"
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);
import router from './modules/router';
import app from './modules/app';
import user from './modules/user';

export default new Vuex.Store({
  modules:{
      user,
      app,
      router,
  },
  plgins:[createPersistedState()]
})