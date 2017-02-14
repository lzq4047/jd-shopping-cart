import Vue from 'vue'
import Router from 'vue-router'
import Cart from '../components/Cart'
import ProductsList from '../components/ProductsList'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'index',
    path: '/',
    redirect: {name: 'productsList'}
  }, {
    name: 'cart',
    path: '/myShoppingCart',
    component: Cart
  }, {
    name: 'productsList',
    path: '/productsList',
    component: ProductsList
  }]
})
