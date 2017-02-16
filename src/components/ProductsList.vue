<template>
  <div>
    <swiper>
      <swiper-item v-for="(productGroup, index) in productsGroups" :active="!index">
        <product-block v-for="product in productGroup" :product="product"></product-block>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import ProductBlock from './ProductBlock'
  import Swiper from './common/Swiper'
  import SwiperItem from './common/SwiperItem'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        products: 'allProducts'
      }),
      productsGroups: function () {
        let groups = []
        let index = 0
        while (index < this.products.length) {
          groups.push(this.products.slice(index, index = index + 4))
        }
        return groups
      }
    },
    methods: {
      ...mapActions({
        addToCart: 'addToCart'
      })
    },
    components: {
      ProductBlock,
      Swiper,
      SwiperItem
    },
    mounted: function () {
      this.$store.dispatch('getAllProducts')
    }
  }
</script>
