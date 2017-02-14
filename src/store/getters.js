export const cartProducts = state => {
  return state.cart.added.map(({id, quantity}) => {
    let productRecord = state.products.allProducts.find(p => p.id === id)
    productRecord.quantity = quantity
    return productRecord
  })
}
