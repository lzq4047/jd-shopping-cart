import Mock from 'mockjs'
import {axiosConfig} from '../config/axios.config.js'

const baseURL = axiosConfig.baseURL || 'http://www.api.com'
const Random = Mock.Random

Mock.mock(baseURL + '/api/getAllProducts', 'get', () => {
  let data = Mock.mock({
    'products|10-50': [{
      'id': () => 'p' + Random.id(),
      'shop': () => {
        let shop = Mock.mock({
          'data|1': [{
            'id': 's520000197408196697',
            'name': '京东自营'
          }, {
            'id': 's610000199204174331',
            'name': '小米旗舰店'
          }, {
            'id': 's37000020071014195X',
            'name': '耐克官方旗舰店'
          }]
        })
        return shop.data
      },
      'name': () => Random.csentence(),
      'type': () => Random.csentence(),
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
