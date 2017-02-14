<template>
  <transition name="fade">
    <div class="swiper-item" v-show="show">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'SwiperItem',
    props: {
      active: Boolean
    },
    computed: {
      index: function () {
        return this._uid
      },
      rootSwiper: function () {
        let parent = this.$parent
        while (parent.$options.name !== 'Swiper' && parent.$options.name !== 'Root') {
          parent = parent.$parent
        }
        return parent
      },
      show: function () {
        return this.rootSwiper.activeIndex === this.index
      }
    },
    mounted: function () {
      this.rootSwiper.itemIndexes.push(this.index)
      this.$nextTick(() => {
        if (this.active) {
          this.rootSwiper.activeIndex = this.index
        }
      })
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  .swiper-item{
    position: absolute;
    left: 0;
    right: 0;
    background-color: #fff;
  }
</style>
