import * as types from '../mutation-types.js'
import shop from '../../api/shop.js'

const CHECKOUT_STATUS_SUCCESS = 0
const CHECKOUT_STATUS_FAILURE = -1
const CHECKOUT_STATUS_DOING = 1

const state = {
  added: [],
  selected: [],
  checkoutStatus: null
}

const getters = {
  cartSelected: state => {
    return state.selected.filter(id => {
      return state.added.findIndex(p => p.id === id) !== -1
    })
  }
}

const mutations = {
  [types.ADD_TO_CART] (state, {id}) {
    let cartRecord = state.added.find(p => p.id === id)
    if (cartRecord) {
      cartRecord.quantity++
    } else {
      state.added.push({
        id: id,
        quantity: 1
      })
    }
  },
  [types.REMOVE_FROM_CART] (state, {ids}) {
    if (!(ids instanceof Array) || !ids.length) {
      return
    }
    for (let id of ids) {
      let cartRecordIndex = state.added.findIndex(p => p.id === id)
      if (~cartRecordIndex) {
        state.added.splice(cartRecordIndex, 1)
      }
    }
  },
  [types.ADD_TO_SELECTED] (state, {ids}) {
    if (!(ids instanceof Array) || !ids.length) {
      return
    }
    // 数组去重
    state.selected = [...new Set([...state.selected, ...ids])]
  },
  [types.REMOVE_FROM_SELECTED] (state, {ids}) {
    for (let id of ids) {
      let cartRecordIndex = state.selected.indexOf(id)
      if (~cartRecordIndex) {
        state.selected.splice(cartRecordIndex, 1)
      }
    }
  },
  [types.CHANGE_QUANTITY] (state, {id, quantity}) {
    let cartRecord = state.added.find(p => p.id === id)
    if (cartRecord) {
      cartRecord.quantity = quantity
    }
  },
  [types.CHECKOUT_REQUEST] (state, {products}) {
    products.forEach((product, index) => {
      let cartRecordIndex = state.added.findIndex(p => p.id === product.id)
      if (!cartRecordIndex) {
        state.added.splice(cartRecordIndex, 1)
      }
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
      commit(types.CHECKOUT_SUCCESS)
    }, error => {
      console.log(error)
      commit(types.CHECKOUT_FAILURE, {savedProducts})
    })
  },
  addToSelected: ({commit}, ids) => {
    if (ids instanceof Array && ids.length) {
      commit(types.ADD_TO_SELECTED, {ids})
    }
  },
  removeFromSelect: ({commit}, ids) => {
    if (ids instanceof Array && ids.length) {
      commit(types.REMOVE_FROM_SELECTED, {ids})
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
