import * as types from './mutation-types.js'

export const addToCart = ({state, commit}, product) => {
  console.log(product)
  if (product.stock > 0) {
    commit(types.ADD_TO_CART, {
      pid: product.id
    })
  }
}
