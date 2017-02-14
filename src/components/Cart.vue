<template>
  <div class="cart">
    <tab horizental>
      <tab-item :label="'全部商品' + cartProducts.length" active>
        <div>
          <div v-if="!cartProducts.length">
            购物车为空
          </div>
          <div v-else>
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
                    <td>
                      <input type="checkbox">
                    </td>
                    <td colspan="5">
                      <a href="#">{{shop.shopName}}</a>
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
                      <!-- <counter v-model="product.quantity"></counter> -->
                      <button>-</button>
                      <input type="number" :value="product.quantity">
                      <button>+</button>
                      <span>{{product.quantity <= product.stock ? '有货' : '无货'}}</span>
                      <span>{{product.quantity}}</span>
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
              <div>
                <span>
                  <input type="checkbox">
                  <label>全选</label>
                </span>
                <span>删除选中的商品</span>
                <span>移到我的关注</span>
                <span>清除下柜商品</span>
              </div>
              <div>
                <p>
                  <span>已选择<em>0</em>件商品<i class="fa fa-caret-up">&nbsp;</i></span>
                  <span>总价：<em>￥19.90</em><i class="fa fa-light">&nbsp;</i></span>
                </p>
                <p>
                  <span>已节省：<em>-￥0.00</em></span>
                </p>
                <button>去结算</button>
              </div>
            </div>
          </div>
        </div>
      </tab-item>
      <tab-item label="京东大药房">
        <div>
          京东大药房
        </div>
      </tab-item>
    </tab>
    <tab horizental>
      <tab-item label="猜你喜欢" active>
        <products-list></products-list>
      </tab-item>
      <tab-item label="我的关注">
        <div>
          我的关注
        </div>
      </tab-item>
      <tab-item label="浏览记录">
        <div>
          浏览记录
        </div>
      </tab-item>
    </tab>
  </div>
</template>

<script>
  import Tab from './common/Tab'
  import TabItem from './common/TabItem'
  import Counter from './common/Counter'
  import ProductsList from './ProductsList'
  import {mapGetters} from 'vuex'
  export default {
    data: function () {
      return {
        quantity: null
      }
    },
    computed: {
      ...mapGetters({
        cartProducts: 'cartProducts'
      }),
      cartShops: function () {
        let shops = []
        this.cartProducts.forEach(product => {
          let shopRecord = shops.find(shop => shop.shopId === product.shopId)
          if (shopRecord) {
            shopRecord.products.push(product)
          } else {
            shops.push({
              shopId: product.shopId,
              shopName: product.shopName,
              products: [product]
            })
          }
        })
        console.log(shops)
        return shops
      }
    },
    components: {
      Tab,
      TabItem,
      Counter,
      ProductsList
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
  .cart-products{
    text-align: left;
  }
  .cart-products thead{
    background-color: #f3f3f3;
  }
</style>
