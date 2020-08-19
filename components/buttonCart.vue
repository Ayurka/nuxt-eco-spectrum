<template>
  <div class="uk-position-medium uk-position-bottom-right uk-position-fixed">
    <div class="image-wrap uk-box-shadow-large" @click="handleToCart">
      <img src="/cart.svg" width="32" height="32" alt="">
      <span class="uk-badge">{{ quantityAll }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "buttonCart",
  computed: {
    ...mapGetters('cart', ['quantityAll'])
  },
  methods: {
    handleToCart () {
      this.$router.push({ name: 'cart' });
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-wrap {
    cursor: pointer;
    position: relative;
    padding: 20px;
    border-radius: 50%;
    background-color: white;
  }
  .uk-badge {
    position: absolute;
    top: 0;
    right: 0;
    font-weight: bold;
    background-color: #f14668;
  }
</style>
