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
  export default {
    name: 'app',
    components: {
      Cart,
      Counter,
      ProductsList,
      Swiper,
      SwiperItem
    }
  }
</script>

<style>
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
