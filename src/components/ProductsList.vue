<template>
  <div>
    products list
  </div>
</template>

<script>
  export default {
    mounted: function () {
      this.$store.dispatch('getAllProducts')
    }
  }
</script>
