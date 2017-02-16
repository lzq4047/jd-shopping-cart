<template>
  <div class="cart">
    <tab horizental>
      <tab-item :label="'全部商品' + cartProducts.length" active>
        <div>
          <div>
            <div v-if="!cartProducts.length">
              购物车为空
            </div>
            <table v-else class="cart-products">
              <thead>
                <tr>
                  <th width="80px">
                    <input type="checkbox" 
                      id="checkAllTop" 
                      :checked="computeChecked(cartProducts)" 
                      @change="handleAllChange($event.target.checked)">
                    <label for="checkAllTop">全选</label>
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
                <template v-for="(shop, shopIndex) in cartShops">
                  <tr class="shop">
                    <td>
                      <input type="checkbox" 
                        :checked="computeChecked(shop.products)"
                        @change="handleShopChange(shop.products, $event.target.checked)">
                    </td>
                    <td colspan="5">
                      <a href="#" class="shop__name">{{shop.name}}</a>
                    </td>
                  </tr>
                  <tr v-for="product in shop.products" class="product">
                    <td>
                      <input type="checkbox" 
                        :checked="computeChecked(product)" 
                        @change="handleProductChange(product.id, $event.target.checked)">
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
                        @input="handleQuantityChange(product.id, $event)"></counter>
                      <span class="stock" :class="product.stock > 0 ? '': 'no-stock'">{{product.stock > 0 ? '有货' : '无货'}}</span>
                    </td>
                    <td class="product__subtotal text-right">
                      <span class="price">￥{{(product.price * product.quantity).toFixed(2)}}</span>
                      <span class="weight">{{product.weight}}Kg</span>
                    </td>
                    <td class="product__actions">
                      <span @click="removeFromCart([product.id])">删除</span>
                      <span v-if="product.quantity > product.stock">到货通知</span>
                      <span>移到我的关注</span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <div class="cart-total clearfix" :class="{'fixed--bottom': isFixed}" ref="cartTotal">
              <div class="cart-total__actions pull-left">
                <input type="checkbox" 
                  id="checkAllBottom" 
                  :checked="computeChecked(cartProducts)" 
                  @change="handleAllChange($event.target.checked)">
                <label for="checkAllBottom">全选</label>
                <span @click="removeFromCart(cartSelected)">删除选中的商品</span>
                <span>移到我的关注</span>
                <span>清除下柜商品</span>
              </div>
              <div class="cart-total__total pull-right">
                <p>
                  <span class="cart-total__overview-toggle">
                    已选择<span class="cart-total__total-num">{{cartSelected.length}}</span>件商品
                    <i class="fa fa-angle-up">&nbsp;</i></span>
                  <span>
                    总价：<span class="cart-total__total-price">￥{{totalPrice}}</span>
                    <i class="fa fa-light">&nbsp;</i>
                  </span>
                </p>
                <p>
                  <span>已节省：<span class="cart-total__saved-price">-￥0.00</span></span>
                </p>
              </div>
              <button class="cart-total__checkout">去结算</button>
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
        isFixed: false
      }
    },
    computed: {
      ...mapGetters(['cartProducts', 'cartSelected', 'totalPrice']),
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
        return shops
      }
    },
    methods: {
      ...mapActions(['changeQuantity', 'addToSelected', 'removeFromSelect', 'removeFromCart']),
      handleQuantityChange: function (id, quantity) {
        this.changeQuantity({
          id,
          quantity
        })
      },
      handleProductChange: function (id, checked) {
        if (checked) {
          this.addToSelected([id])
        } else {
          this.removeFromSelect([id])
        }
      },
      handleShopChange: function (products, checked) {
        let ids = products.reduce((accumulator, product) => {
          return [...accumulator, product.id]
        }, [])
        if (checked) {
          this.addToSelected(ids)
        } else {
          this.removeFromSelect(ids)
        }
      },
      handleAllChange: function (checked) {
        let ids = this.cartProducts.reduce((accumulator, product) => {
          return [...accumulator, product.id]
        }, [])
        if (checked) {
          this.addToSelected(ids)
        } else {
          this.removeFromSelect(ids)
        }
      },
      computeChecked: function (products) {
        let type = Object.prototype.toString.apply(products)
        if (type === '[object Array]') {
          let isAllSelected = products.every(product => {
            return ~this.cartSelected.indexOf(product.id)
          })
          return isAllSelected
        } else if (type === '[object Object]') {
          return ~this.cartSelected.indexOf(products.id)
        }
      }
    },
    components: {
      Tab,
      TabItem,
      Counter,
      ProductsList
    },
    mounted: function () {
      this.$nextTick(() => {
        let timer = null
        window.onscroll = (event) => {
          let offsetTop = this.$refs.cartTotal.offsetTop
          let elementHeight = this.$refs.cartTotal.clientHeight
          // scroll event split-flow事件分流
          if (timer) {
            return
          } else {
            timer = setTimeout(() => {
              let shouldFix = (offsetTop - window.scrollY + elementHeight) > window.innerHeight
              if (shouldFix) {
                this.isFixed = true
              } else {
                this.isFixed = false
              }
              timer = null
            }, 300)
          }
        }
      })
    }
  }
</script>

<style>
  .cart-link{
    cursor: pointer;
  }
  .cart-link:hover{
    color: #e4393c;
  }
  .cart{
    margin-bottom: 60px;
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
  .cart-products td,
  .cart-products th{
    border: 1px solid #f0f0f0;
  }
  .shop td{
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom: 2px solid #aaa;
  }
  .shop__name{
    padding: 3px 5px;
    background-color: #e4393c;
    color: #fff;
    text-decoration: none;
    border-radius: 2px;
  }
  .product td{
    border-left-color: transparent;
    border-right-color: transparent;
    vertical-align: top;
  }
  .product td:first-of-type{
    border-left-color: #f1f1f1;
  }
  .product td:last-of-type{
    border-right-color: #f1f1f1;
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
    margin: -1px 0;
    justify-content: space-between;
  }
  .product__detail .image{
    flex-basis: 80px;
  }
  .product__detail .name{
    padding: 0 5px;
    cursor: pointer;
    flex-basis: 180px;
  }
  .product__detail .type{
    padding: 0 5px;
    flex-basis: 170px;
  }
  .product__detail .name:hover{
    color: #e4393c;
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
  .cart-total{
    position: relative;
    margin-top: 20px;
    position: relative;
    height: 50px;
    border: 1px solid #f0f0f0;
    color: #999;
    background-color: #fff;
    z-index: 3;
  }
  .cart-total__actions{
    height: 50px;
    line-height: 50px;
    padding-left: 8px;
  }
  .cart-total__actions span:hover{
    color: #e4393c;
    cursor: pointer;
  }
  .cart-total__total{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 110px;
  }
  .cart-total__total p{
    margin: 0;
    text-align: right;
  }
  .cart-total__total p > span{
    margin: 0 5px;
  }
  .cart-total__total-num,
  .cart-total__total-price{
    padding-left: 5px;
    font-size: 16px;
    font-weight: 700;
    color: #e4393c;
  }
  .cart-total__saved-price{
    padding: 0 8px;
    color: #666;
  }
  .cart-total__overview-toggle{
    cursor: pointer;
  }
  .cart-total__checkout{
    width: 100px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    border: 1px solid #e4393c;
    border-width: 0 1px;
    background-color: #e4393c;
    color: #fff;
    font-weight: 700;
    font-size: 16px;
  }
  .fixed--bottom{
    position: fixed;
    bottom: 0;
    width: 990px;
  }
</style>
