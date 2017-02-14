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
        let tmp = []
        this.products.map((product, index) => {
          if (index % 5 === 0) {
            groups.push(tmp)
            tmp = []
          } else {
            tmp.push(product)
          }
        })
        return groups.slice(1)
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
