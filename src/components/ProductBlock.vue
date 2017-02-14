<template>
  <div class="product-block">
    <img class="product-block__image" :src="product.image" height="160" width="160" alt="">
    <p class="product-block__name" :title="product.name">{{product.name}}</p>
    <p class="product-block__price">
      ￥<span>{{product.price}}</span>
    </p>
    <p class="product-block__actions">
      <button @click="addToCart(product)" :disabled="!product.stock">加入购物车</button>
    </p>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    methods: {
      ...mapActions({
        addToCart: 'addToCart'
      })
    }
  }
</script>

<style>
  .product-block{
    position: relative;
    /*margin-left: -1px;*/
    width: 25%;
    padding: 5px;
    padding-right: 6px;
    display: inline-block;
    overflow: hidden;
    border: 1px dashed #ebebeb;
    text-align: center;
    box-sizing: border-box;
    color: #333;
    transition: border-color .3s ease;
  }
  .product-block:hover{
    /*z-index: 2;*/
    border: 1px solid #e4393c;
  }
  .product-block:first-of-type{
    margin-left: 0;
  }
  .product-block + .product-block:hover{

  }
  .product-block__name{
    font-size: 12px;
    line-height: 18px;
    height: 36px;
    overflow: hidden;
  }
  .product-block__actions button{
    padding: 8px 20px;
    border: 1px solid #999;
    border-radius: 4px;
    background-color: transparent;
    outline: 0;
    color: #666;
    transition: background-color .3s ease, border-color .3s ease, color .3s ease;
    cursor: pointer;
  }
  .product-block__actions button:hover{
    background-color: #e4393c;
    border-color: #e4393c;
    color: #fff;
  }
  .product-block__actions button:active{
    box-shadow: 0 0 2px #e4393c;
  }
  .product-block__actions button:disabled{
    background-color: #cccccc;
    color: #fff;
    border-color: #cccccc;
    cursor: not-allowed;
  }
</style>
