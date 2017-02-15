<template>
  <div class="tab" :class="{'is-horizental': horizental}">
    <ul class="tab__lists">
      <li class="tab__list" :class="{'is-active': label.index === activeIndex}" v-for="label in labels" @click="activeIndex = label.index">
        <span class="tab__icon" v-if="label.iconClass" :class="label.iconClass">&nbsp;</span>
        <span class="tab__title" v-html="label.title">&nbsp;</span>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Tab',
    data: function () {
      return {
        activeIndex: 1,
        labels: []
      }
    },
    props: {
      horizental: Boolean
    },
    watch: {
      labels: function (newVal) {
        console.log(newVal)
      }
    },
    methods: {
      getTitle: () => {
        return null
      }
    }
  }
</script>

<style>
  .tab__lists{
    padding-left: 0;
    border-bottom: 1px solid #e9e9e9;
  }
  .tab__list{
    padding: 8px 15px;
    list-style: none;
    cursor: pointer;
  }
  .tab__list + .tab__list{
    margin-left: 20px;
  }
  .tab.is-horizental .tab__list{
    display: inline-block;
    border-bottom: 2px solid transparent;
  }
  .tab.is-horizental .tab__list.is-active{
    border-bottom-color: #e4393c;
  }
</style>
