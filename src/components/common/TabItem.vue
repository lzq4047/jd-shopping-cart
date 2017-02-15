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
      },
      titleProperties: function () {
        return {
          title: this.label || '标签页',
          index: this.index,
          iconClass: this.iconClass
        }
      }
    },
    methods: {
      updateLabel: function () {
        let labelRecord = this.rootTab.labels.find(label => label.index === this.titleProperties.index)
        if (labelRecord) {
          labelRecord.title = this.titleProperties.title
          labelRecord.iconClass = this.titleProperties.iconClass
        } else {
          this.rootTab.labels.push(this.titleProperties)
        }
      }
    },
    beforeUpdate: function () {
      this.updateLabel()
    },
    mounted: function () {
      this.updateLabel()
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
