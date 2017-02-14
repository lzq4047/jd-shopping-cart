import * as types from '../mutation-types.js'
import shop from '../../api/shop.js'

const state = {
  allProducts: []
}

const getters = {
  allProducts: state => state.allProducts
}

const mutations = {
  [types.ADD_TO_CART] (state, {pid}) {
    let productRecord = state.allProducts.find(p => p.id === pid)
    if (productRecord) {
      productRecord.stock--
    }
  },
  [types.GET_ALL_PRODUCTS] (state, {products}) {
    state.allProducts = products
  },
  [types.GET_BY_PROPDUCT_ID] (state, {id}) {
    let productRecord = state.allProducts.find(p => p.id === id)
    return productRecord
  },
  [types.RECEIVE_PRODUCT] (state, {products}) {
    products.forEach((product, index) => {
      let productRecord = state.allProducts.find(p => p.id === product.id)
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
  getters,
  mutations,
  actions
}
