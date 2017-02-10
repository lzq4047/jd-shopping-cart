<template>
  <div class="counter">
    <span class="counter__minus" :class="{'is-disabled': value <= min}" @click="decrement">&minus;</span>
    <input class="counter__value" type="tel" :value="computedValue" @input="updateValue($event.target.value)">
    <span class="counter__plus" :class="{'is-disabled': value >= max}" @click="increment">&plus;</span>
  </div>
</template>

<script>
  export default {
    props: ['value', 'min', 'max'],
    computed: {
      computedValue: function () {
        return this.value
      }
    },
    watch: {
      value: function (newVal) {
        this.computedValue = newVal
      }
    },
    methods: {
      updateValue: function (value) {
        this.$emit('input', value)
      },
      decrement: function () {
        this.updateValue(--this.computedValue)
      },
      increment: function () {
        this.updateValue(++this.computedValue)
      }
    }
  }
</script>

<style>
  .counter{
    display: table;
    width: 1px;
    border-collapse: separate;
  }
  .counter .is-disabled{
    background-color: #E8E8E8;
    pointer-events: none;
  }
  .counter__value{
    padding: 3px 10px;
    margin-left: -3px;
    margin-right: -3px;
    display: table-cell;
    width: 30px;
    border: 1px solid #cacbcb;
    border-width: 1px 0;
    text-align: center;
  }
  .counter__value:focus{
    box-shadow: none;
    outline: 0;
  }
  .counter__minus,
  .counter__plus{
    position: relative;
    display: table-cell;
    width: 1%;
    z-index: 1;
    cursor: pointer;
    border: 1px solid #cacbcb;
    padding: 0 8px;
  }
</style>
