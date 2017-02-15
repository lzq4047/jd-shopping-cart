<template>
  <div class="counter">
    <span class="counter__minus" :class="{'is-disabled': value <= min}" @click="decrement">&minus;</span>
    <input class="counter__value" type="number" :value="value" @input="updateValue($event.target.value)" ref="value">
    <span class="counter__plus" :class="{'is-disabled': value >= max}" @click="increment">&plus;</span>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Number,
        required: true
      },
      min: Number,
      max: Number
    },
    methods: {
      updateValue: function (value) {
        value = parseInt(value)
        if (Number.isNaN(value)) {
          value = 0
        }
        if (value < this.min) {
          value = this.min
        } else if (value > this.max) {
          value = this.max
        }
        this.$emit('input', value)
      },
      decrement: function () {
        this.updateValue(this.value - 1)
      },
      increment: function () {
        this.updateValue(this.value + 1)
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
    width: 50px;
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
  .counter__minus:hover,
  .counter__plus:hover{
    color: #e4393c;
  }
  input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{  /* chrome */
    -webkit-appearance: none!important;
    margin: 0;
  }
  input[type="number"]{
    -moz-appearance:textfield; /*Firefox*/
  }
</style>
