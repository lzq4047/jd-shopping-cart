import * as types from './mutation-types.js'

export const addToCart = ({state, commit}, product) => {
  if (product.stock > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  }
}

export const changeQuantity = ({state, commit}, product) => {
  let cartRecord = state.cart.added.find(p => p.id === product.id)
  let productRecord = state.products.allProducts.find(p => p.id === product.id)
  if (cartRecord && productRecord) {
    let originQuantity = cartRecord.quantity
    let originStock = productRecord.stock
    let difference = product.quantity - originQuantity
    let stock = originStock - difference
    commit(types.CHANGE_QUANTITY, {
      id: product.id,
      quantity: product.quantity
    })
    commit(types.CHANGE_STOCK, {
      id: product.id,
      stock
    })
  }
}

export const removeFromCart = ({state, commit}, ids) => {
  console.log(ids)
  if (ids instanceof Array && ids.length) {
    for (let id of ids) {
      let cartRecord = state.cart.added.find(p => p.id === id)
      let productRecord = state.products.allProducts.find(p => p.id === id)
      if (productRecord && cartRecord) {
        commit(types.CHANGE_STOCK, {
          id,
          stock: productRecord.stock + cartRecord.quantity
        })
      }
    }
    commit(types.REMOVE_FROM_SELECTED, {ids})
    commit(types.REMOVE_FROM_CART, {ids})
  }
}
