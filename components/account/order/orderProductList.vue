<template>
  <tr>
    <td>
      <img v-if="product.image" :data-src="'http://localhost/storage/' + product.image" width="50" height="50" alt="" uk-img>
      <img v-else data-src="/no-image.png" width="50" height="50" alt="" uk-img>
    </td>
    <td>{{ product.title }}</td>
    <td>{{ product.pivot.quantity }} шт.</td>
    <td>{{ product.price | currency }}</td>
    <td>{{ subTotal | currency }}</td>
  </tr>
</template>

<script>
export default {
  name: "orderProductList",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    subTotal () {
      return +this.product.pivot.quantity * this.product.price
    }
  }
}
</script>

<style scoped>

</style>
