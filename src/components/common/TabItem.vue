<template>
  <div class="tab-item" :class="{'is-active': show}">
    <slot name="title" ref="title" class="title"></slot>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TabItem',
    props: {
      label: String,
      iconClass: String,
      active: Boolean
    },
    computed: {
      index: function () {
        return this._uid
      },
      rootTab: function () {
        let parent = this.$parent
        while (parent.$options.name !== 'Tab' && parent.$options.name !== 'Root') {
          parent = parent.$parent
        }
        return parent
      },
      show: function () {
        return this.rootTab.activeIndex === this.index
      }
    },
    mounted: function () {
      this.rootTab.labels.push({
        title: this.label || '标签页',
        index: this.index,
        iconClass: this.iconClass
      })
      this.$nextTick(() => {
        if (this.active) {
          this.rootTab.activeIndex = this.index
        }
      })
    }
  }
</script>
<style>
  .tab-item:not(.is-active){
    display: none;
  }
</style>
