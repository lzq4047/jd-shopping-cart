<template>
  <div class="swiper" @mouseenter="showActions = true" @mouseleave="showActions = false">
    <div v-show="showActions">
      <button class="swiper__pre" @click="pre">&lt;</button>
      <button class="swiper__next" @click="next">&gt;</button>
    </div>
    <div class="swiper__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Swiper',
    data: function () {
      return {
        itemIndexes: [],
        activeIndex: null,
        showActions: false,
        transitionName: 'slide-left'
      }
    },
    props: {
      autoplay: Boolean,
      duration: Number
    },
    methods: {
      pre: function () {
        this.transitionName = 'slide-left'
        let recordIndex = this.itemIndexes.findIndex(v => v === this.activeIndex)
        this.changeActiveIndex(recordIndex - 1)
      },
      next: function () {
        this.transitionName = 'slide-right'
        let recordIndex = this.itemIndexes.findIndex(v => v === this.activeIndex)
        this.changeActiveIndex(recordIndex + 1)
      },
      changeActiveIndex: function (index) {
        if (index < 0) {
          this.activeIndex = this.itemIndexes[this.itemIndexes.length - 1]
        } else if (index > this.itemIndexes.length - 1) {
          this.activeIndex = this.itemIndexes[0]
        } else {
          this.activeIndex = this.itemIndexes[index]
        }
      }
    },
    mounted: function () {
      this.$nextTick(() => {
        if (this.autoplay) {
          setInterval(this.next, this.duration || 3000)
        }
      })
    }
  }
</script>

<style>
  .swiper{
    position: relative;
    width: 100%;
    min-height: 310px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .swiper__pre,
  .swiper__next{
    font-family: simsun;
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -50px;
    width: 40px;
    height: 100px;
    font-size: 50px;
    background: rgba(0, 0, 0, .1);
    color: #999;
    border: 1px solid #ebebeb;
    box-shadow: none;
    outline: 0;
    cursor: pointer;
    transition: background .3s ease;
    z-index: 1;
  }
  .swiper__pre:hover,
  .swiper__next:hover{
    background: rgba(0, 0, 0, .2);
  }
  .swiper__pre{
    left: 1px;
  }
  .swiper__next{
    right: 1px;
  }
</style>
