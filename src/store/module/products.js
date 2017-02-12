import * as types from '../mutation-types.js'
import shop from '../../api/shop.js'

const state = {
  products: []
}

const mutations = {
  [types.GET_ALL_PRODUCTS] (state, {products}) {
    console.log(products)
    state.products = products
  },
  [types.GET_BY_PROPDUCT_ID] (state, {id}) {
    let productRecord = state.products.find(p => p.id === id)
    return productRecord
  },
  [types.RECEIVE_PRODUCT] (state, {products}) {
    products.forEach((product, index) => {
      let productRecord = state.products.find(p => p.id === product.id)
      if (!productRecord) {
        return
      }
      productRecord.stock = productRecord.stock + product.quantity
    })
  }
}

const actions = {
  getAllProducts: ({commit}) => {
    shop.getAllProducts(response => {
      commit(types.GET_ALL_PRODUCTS, response)
    }, error => {
      console.log(error)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
