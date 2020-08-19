<template>
  <div v-show="isActive"><slot></slot></div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    name: { required: true },
    info: {},
    selected: { default: false }
  },
  data: () => ({
    isActive: false
  }),
  created () {
    this.isActive = this.selected
  }
}
</script>

<style scoped>

</style>
