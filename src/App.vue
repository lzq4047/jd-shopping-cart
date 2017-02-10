<template>
  <div id="app">
    <cart></cart>
  </div>
</template>

<script>
  import Cart from './components/Cart'
  import Counter from './components/common/Counter'
  export default {
    name: 'app',
    data: function () {
      return {
        obj1: {
          arr1: [{
            obj3: {
              currentValue: 1
            }
          }]
        }
      }
    },
    components: {
      Cart,
      Counter
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
