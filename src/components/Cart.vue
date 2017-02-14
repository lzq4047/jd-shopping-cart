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
                  <th width="450px">
                    <span>商品</span>
                  </th>
                  <th width="80px" class="text-right">
                    <span>单价</span>
                  </th>
                  <th width="150px" class="text-center">
                    <span>数量</span>
                  </th>
                  <th width="100px" class="text-right">
                    <span>小计</span>
                  </th>
                  <th>
                    <span>操作</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <template v-for="shop in cartShops">
                  <tr class="shop">
                    <td>
                      <input type="checkbox">
                    </td>
                    <td colspan="5">
                      <a href="#" class="shop__name">{{shop.name}}</a>
                    </td>
                  </tr>
                  <tr v-for="product in shop.products" class="product">
                    <td>
                      <input type="checkbox">
                    </td>
                    <td class="product__detail">
                      <img class="image" :src="product.image" height="80" width="80" :alt="product.name">
                      <div class="name">{{product.name}}</div>
                      <div class="type">{{product.type}}</div>
                    </td>
                    <td class="product__price text-right">
                      ￥<span>{{product.price}}</span>
                    </td>
                    <td class="product__quantity text-center">
                      <counter 
                        class="quantity"
                        :value="product.quantity" 
                        :min="0" 
                        @input="change(product.id, $event)"></counter>
                      <span class="stock" :class="product.quantity <= product.stock ? '': 'no-stock'">{{product.quantity <= product.stock ? '有货' : '无货'}}</span>
                    </td>
                    <td class="product__subtotal text-right">
                      <span class="price">￥{{(product.price * product.quantity).toFixed(2)}}</span>
                      <span class="weight">{{product.weight}}Kg</span>
                    </td>
                    <td class="product__actions">
                      <span>删除</span>
                      <span v-if="product.quantity > product.stock">到货通知</span>
                      <span>移到我的关注</span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <div class="cart-total text-right">
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
  import {mapGetters, mapActions} from 'vuex'
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
          let shopRecord = shops.find(shop => shop.id === product.shop.id)
          if (shopRecord) {
            shopRecord.products.push(product)
          } else {
            shops.push({
              id: product.shop.id,
              name: product.shop.name,
              products: [product]
            })
          }
        })
        console.log(shops)
        return shops
      }
    },
    methods: {
      ...mapActions({
        changeQuantity: 'changeQuantity'
      }),
      change: function (pid, quantity) {
        console.log(quantity)
        this.changeQuantity({
          pid,
          quantity: quantity
        })
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
  .text-right{
    text-align: right !important;
  }
  .text-center{
    text-align: center !important;
  }
  .cart .tab__list{
    font-size: 16px;
    font-weight: 700;
  }
  .cart .tab__list.is-active{
    color: #e4393c;
  }
  .cart-products{
    text-align: left;
    border-collapse: collapse;
  }
  .shop td{
    border-bottom: 2px solid #f1f1f1;
  }
  .product td{
    border-width: 1px 0;
    border-style: solid;
    border-color: #ebebeb;
    vertical-align: top;
  }
  .product td:first-of-type{
    border-left-width: 1px;
  }
  .product td:last-of-type{
    border-right-width: 1px;
  }
  .cart-products th,
  .cart-products td{
    padding: 5px 8px;
    font-weight: normal;
    font-size: 12px;
  }
  .cart-products thead{
    background-color: #f3f3f3;
    height: 32px;
    line-height: 32px;
  }
  .product__detail{
    display: flex;
  }
  .product__detail > *{
    margin: 0 5px;
  }
  .product__quantity .quantity{
    margin: 0 auto;
  }
  .product__quantity .stock{
    color: #aaa;
  }
  .product__quantity .no-stock{
    color: #e4393c;
  }
  .product__subtotal .price,
  .product__subtotal .weight{
    display: block;
  }
  .product__subtotal .price{
    font-weight: 700;
  }
  .product__actions span{
    display: block;
    color: #666;
  }
  .product__actions span:hover{
    cursor: pointer;
    color: #e4393c;
  }
</style>
