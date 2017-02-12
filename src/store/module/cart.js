import * as types from '../mutation-types.js'
import shop from '../../api/shop.js'

const CHECKOUT_STATUS_SUCCESS = 0
const CHECKOUT_STATUS_FAILURE = -1
const CHECKOUT_STATUS_DOING = 1

const state = {
  added: [],
  checkoutStatus: null
}

const getters = {

}

const mutations = {
  [types.REMOVE_FROM_CART] (state, {pid}) {
    let cartRecordIndex = state.added.findIndex(p => p.id === pid)
    if (!cartRecordIndex) {
      return
    }
    state.added.splice(cartRecordIndex, 1)
  },
  [types.CHANGE_QUANTITY] (state, {pid, quantity}) {
    let cartRecord = state.added.find(p => p.id === pid)
    if (cartRecord) {
      cartRecord.quantity = quantity
    }
  },
  [types.CHECKOUT_REQUEST] (state, products) {
    products.forEach((product, index) => {
      let cartRecordIndex = state.added.findIndex(p => p.id === product.id)
      state.added.splice(cartRecordIndex, 1)
    })
    state.checkoutStatus = CHECKOUT_STATUS_DOING
  },
  [types.CHECKOUT_SUCCESS] (state) {
    state.checkoutStatus = CHECKOUT_STATUS_SUCCESS
  },
  [types.CHECKOUT_FAILURE] (state, {savedProducts}) {
    state.added.push(savedProducts)
    state.checkoutStatus = CHECKOUT_STATUS_FAILURE
  }
}

const actions = {
  checkout: ({commit, state}, products) => {
    if (!products) {
      return
    }
    let savedProducts = products
    commit(types.CHECKOUT_REQUEST)
    shop.checkout(products, response => {
      console.log(response)
      commit(types.CHECKOUT_SUCCESS)
    }, error => {
      console.log(error)
      commit(types.CHECKOUT_FAILURE, {savedProducts})
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
