export const cartProducts = state => {
  return state.cart.added.map(({id, quantity}) => {
    let productRecord = state.products.allProducts.find(p => p.id === id)
    Object.assign(productRecord, {quantity})
    return productRecord
  })
}

export const cartSelected = state => {
  return state.cart.selected
}

export const totalPrice = state => {
  let totalPrice = state.cart.selected.reduce((accumulator, id) => {
    let price = state.products.allProducts.find(p => p.id === id).price
    let quantity = state.cart.added.find(p => p.id === id).quantity
    let subtotal = parseFloat((price * quantity).toFixed(2))
    return accumulator + subtotal
  }, 0)
  return totalPrice.toFixed(2)
}
