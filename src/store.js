import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      cash: 0
   },
   getters: {
      cash: state => state.cash,
   },
   mutations: {
      addCash (state, amount) {
         state.cash += amount;
      },
      subtractCash (state, amount) {
         state.cash -= amount;
         state.cash = state.cash < 0 ? 0 : state.cash;
      }
   },
   actions: {
      addCash ({ commit }, amount) {
         commit('addCash', amount);
      },
      subtractCash ({ commit }, amount) {
         commit('subtractCash', amount);
      }
   }
})
