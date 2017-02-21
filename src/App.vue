<template>
  <div id="app">
    <cart></cart>
  </div>
</template>

<script>
  import Cart from './components/Cart'
  import ProductsList from './components/ProductsList'
  import Counter from './components/common/Counter'
  import Swiper from './components/common/Swiper'
  import SwiperItem from './components/common/SwiperItem'
  import Popup from './components/common/Popup'
  export default {
    name: 'app',
    data: function () {
      return {
        show: false
      }
    },
    components: {
      Cart,
      Counter,
      ProductsList,
      Swiper,
      SwiperItem,
      Popup
    }
  }
</script>

<style>
  *{
    box-sizing: border-box;
  }
  .text-right{
    text-align: right !important;
  }
  .text-center{
    text-align: center !important;
  }
  .pull-left{
    float: left !important;
  }
  .pull-right{
    float: right !important;
  }
  .clearfix:before,
  .clearfix:after{
    display: table;
    content: "";
  }
  .clearfix:after{
    clear: both;
    }
  #app {
    font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
  }
  .cart{
    margin: 20px auto;
    width: 990px;
  }
</style>
