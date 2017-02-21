<template>
  <div class="popup">
    <div class="popup__content" :class="{'is-visible': show}" :style="computedStyle" ref="content">
      <slot></slot>
    </div>
    <div class="popup__title" @click="handleClick($event)" @mouseenter="handleMouseOver($event)" @mouseleave="handleMouseLeave" ref="title">
      <slot name="title"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        show: false,
        resultDirection: 'top',
        contentHeight: 0,
        titleHeight: 0,
        contentWidth: 0,
        titleWidth: 0
      }
    },
    props: {
      direction: {
        type: String,
        default: 'top'
      },
      emitType: {
        type: String,
        default: 'click'
      }
    },
    computed: {
      computedStyle: function () {
        if (this.resultDirection === 'top') {
          return {'top': -this.contentHeight + 'px'}
        }
        if (this.resultDirection === 'bottom') {
          return {'top': this.titleHeight + 'px'}
        }
        if (this.resultDirection === 'left') {
          return {'left': -this.contentWidth + 'px'}
        }
        if (this.resultDirection === 'right') {
          return {'left': this.titleWidth + 'px'}
        }
      }
    },
    methods: {
      computeDirection: function (e) {
        let pageX = e.pageX
        let pageY = e.pageY
        let targetHeight = e.target.clientHeight
        let targetWidth = e.target.clientWidth
        this.contentHeight = this.$refs.content && this.$refs.content.clientHeight
        this.contentWidth = this.$refs.content && this.$refs.content.clientWidth
        this.titleHeight = this.$refs.title && this.$refs.title.clientHeight
        this.titleWidth = this.$refs.title && this.$refs.title.clientWidth
        let bodyHeight = document.body.clientHeight
        let bodyWidth = document.body.clientWidth
        let retDirection = this.direction
        switch (this.direction) {
          case 'top':
            retDirection = pageY > this.contentHeight ? 'top' : 'bottom'
            break
          case 'bottom':
            retDirection = bodyHeight - pageY - targetHeight > this.contentHeight ? 'bottom' : 'top'
            break
          case 'left':
            retDirection = pageX > this.contentWidth ? 'left' : 'right'
            break
          case 'right':
            retDirection = bodyWidth - pageX - targetWidth > this.contentWidth ? 'right' : 'left'
            break
          default:
            break
        }
        return retDirection
      },
      handleClick: function (e) {
        if (this.emitType !== 'click') {
          return
        }
        this.resultDirection = this.computeDirection(e)
        this.show = !this.show
      },
      handleMouseOver: function (e) {
        console.log(e)
        if (this.emitType !== 'hover') {
          return
        }
        this.resultDirection = this.computeDirection(e)
        this.show = true
      },
      handleMouseLeave: function () {
        if (this.emitType !== 'hover') {
          return
        }
        this.show = false
      }
    }
  }
</script>

<style>
  .popup{
    position: relative;
  }
  .popup__content{
    padding: 10px;
    position: absolute;
    border: 1px solid #999;
    border-radius: 4px;
    background-color: rgba(102,102,102,.85);
    color: #fff;
    visibility: hidden;
    z-index: 10;
  }
  .popup__content.is-visible{
    visibility: visible;
  }
  .popup__title{
    display: inline-block;
    cursor: pointer;
  }
  .popup__close:hover{
    color: #e4393c;
  }
</style>
