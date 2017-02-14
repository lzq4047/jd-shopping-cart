import Mock from 'mockjs'
import {axiosConfig} from '../config/axios.config.js'

const baseURL = axiosConfig.baseURL || 'http://www.api.com'
const Random = Mock.Random

Mock.mock(baseURL + '/api/getAllProducts', 'get', () => {
  let data = Mock.mock({
    'products|10-50': [{
      'id': () => 'p' + Random.id(),
      'shopId': () => 's' + Random.id(),
      'name': () => Random.csentence(),
      'shopName': () => Random.csentence(Random.integer(5, 12)),
      'price': () => Random.float(10, 1000).toFixed(2),
      'stock': () => Random.integer(0, 20),
      'weight': () => Random.float(1, 20).toFixed(2),
      'image': function () {
        return Random.image('160x160', Random.hex(), Random.hex(), 'png', this.name.substring(0, 2))
      }
    }]
  })
  return data
})
