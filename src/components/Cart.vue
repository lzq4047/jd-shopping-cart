<template>
  <div class="cart">
    <tab horizental>
      <tab-item :label="'全部商品' + cartProducts.length" active>
        <div>
          <table class="cart-products">
            <thead>
              <tr>
                <th width="80px">
                  <input type="checkbox">
                  <span>全选</span>
                </th>
                <th width="530px">
                  <span>商品</span>
                </th>
                <th width="80px">
                  <span>单价</span>
                </th>
                <th width="100px">
                  <span>数量</span>
                </th>
                <th width="100px">
                  <span>小计</span>
                </th>
                <th>
                  <span>操作</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="shop in cartShops">
                <tr>
                  <td colspan="6">
                    <input type="checkbox">
                    <a href="#">{{shop.name}}</a>
                  </td>
                </tr>
                <tr v-for="product in shop.products">
                  <td>
                    <input type="checkbox">
                  </td>
                  <td>
                    <div>
                      <img src="../assets/587f476aNcfbf7869.jpg" height="80" width="80" :alt="product.name">
                      <div>
                        <span>{{product.name}}</span>
                        <span>{{product.type}}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span>￥{{product.price}}</span>
                  </td>
                  <td>
                    <!-- <counter v-model="quantity"></counter> -->
                    <input type="number" v-model="product.quantity">
                    <span>{{product.quantity}} </span>
                  </td>
                  <td>
                    <span>￥{{product.price * product.quantity}}</span>
                    <span>{{product.weight}}Kg</span>
                  </td>
                  <td>
                    <span>删除</span>
                    <span>移到我的关注</span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <div class="cart-total">
            
          </div>
        </div>
      </tab-item>
      <tab-item label="京东大药房">
        <div>
          京东大药房
        </div>
      </tab-item>
    </tab>
  </div>
</template>

<script>
  import Tab from './common/Tab'
  import TabItem from './common/TabItem'
  import Counter from './common/Counter'
  export default {
    data: function () {
      return {
        quantity: null
      }
    },
    computed: {
      cartProducts: function () {
        return [{}, {}, {}]
      },
      cartShops: function () {
        return [{
          name: '京东自营',
          products: [{
            id: '1',
            name: '联想(Lenovo)小新700电竞尊享升级版15.6英寸游戏笔记本电脑(i5-6300HQ 8G 500G+128G SSD GTX950M 4G IPS)黑',
            type: '颜色：i5 双硬盘 4G显存 预装Office',
            price: 5499.00,
            quantity: 2,
            weight: 10.26,
            stock: 2
          }, {
            id: '2',
            name: '联想(Lenovo)小新700电竞尊享升级版15.6英寸游戏笔记本电脑(i5-6300HQ 8G 500G+128G SSD GTX950M 4G IPS)黑',
            type: '颜色：i5 双硬盘 4G显存 预装Office',
            price: 5499.00,
            quantity: 2,
            weight: 10.26,
            stock: 1
          }, {
            id: '3',
            name: '联想(Lenovo)小新700电竞尊享升级版15.6英寸游戏笔记本电脑(i5-6300HQ 8G 500G+128G SSD GTX950M 4G IPS)黑',
            type: '颜色：i5 双硬盘 4G显存 预装Office',
            price: 5499.00,
            quantity: 3,
            weight: 10.26,
            stock: 4
          }]
        }, {
          name: '小米官方旗舰店',
          products: [{
            id: '4',
            name: '联想(Lenovo)小新700电竞尊享升级版15.6英寸游戏笔记本电脑(i5-6300HQ 8G 500G+128G SSD GTX950M 4G IPS)黑',
            type: '颜色：i5 双硬盘 4G显存 预装Office',
            price: 5499.00,
            quantity: 1,
            weight: 10.26,
            stock: 2
          }, {
            id: '5',
            name: '联想(Lenovo)小新700电竞尊享升级版15.6英寸游戏笔记本电脑(i5-6300HQ 8G 500G+128G SSD GTX950M 4G IPS)黑',
            type: '颜色：i5 双硬盘 4G显存 预装Office',
            price: 5499.00,
            quantity: 2,
            weight: 10.26,
            stock: 1
          }, {
            id: '6',
            name: '联想(Lenovo)小新700电竞尊享升级版15.6英寸游戏笔记本电脑(i5-6300HQ 8G 500G+128G SSD GTX950M 4G IPS)黑',
            type: '颜色：i5 双硬盘 4G显存 预装Office',
            price: 5499.00,
            quantity: 3,
            weight: 10.26,
            stock: 3
          }]
        }]
      }
    },
    components: {
      Tab,
      TabItem,
      Counter
    }
  }
</script>

<style>
  .cart .tab__list{
    font-size: 16px;
    font-weight: 700;
  }
  .cart .tab__list.is-active{
    color: #e4393c;
  }
  .cart-products thead{
    background-color: #f3f3f3;
  }
</style>
