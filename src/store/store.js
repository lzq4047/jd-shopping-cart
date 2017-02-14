import Vue from 'vue'
import Vuex from 'vuex'

import cart from './module/cart.js'
import products from './module/products.js'

import * as getters from './getters.js'
import * as actions from './actions.js'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  actions,
  modules: {
    cart,
    products
  }
})
