import axios from '../config/axios.config.js'
import '../mock/mock.shop.js'
export default {
  checkout: function (products, successCallback, failureCallback) {
    if (!products) {
      failureCallback(new Error('未选中任何商品'))
    }
    axios.post('/api/checkout', {
      products
    }).then(response => {
      successCallback(response.data)
    }).catch(error => {
      failureCallback(error)
    })
  },
  getAllProducts: function (successCallback, failureCallback) {
    axios.get('/api/getAllProducts')
      .then(response => {
        successCallback(response.data)
      }).catch(error => {
        failureCallback(error)
      })
  }
}
