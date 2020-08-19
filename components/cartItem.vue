<template>
  <tr>
    <td>
      <img v-if="cartItem.image" :data-src="cartItem.image" width="50" height="50" alt="" uk-img>
      <img v-else data-src="no-image.png" width="50" height="50" alt="" uk-img>
    </td>
    <td><span>{{ cartItem.title }}</span></td>
    <td><span>{{ cartItem.price | currency }}</span></td>
    <td>
      <input
        type="number"
        class="uk-input"
        :value="cartItem.quantity"
        @input="updateQuantity"
        min="1">
    </td>
    <td>{{ subtotal | currency }}</td>
    <td><a class="uk-icon-button uk-text-danger" uk-icon="icon: trash" @click="removeItem"></a></td>
  </tr>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'cartItem',
  props: {
    cartItem: {
      type: Object,
      required: true
    }
  },
  computed: {
    subtotal () {
      return +this.cartItem.quantity * this.cartItem.price
    }
  },
  methods: {
    ...mapMutations({
      updateCart: 'cart/updateCart',
      removeCartItem: 'cart/removeCartItem'
    }),
    removeItem () {
      this.removeCartItem({
        item: this.cartItem
      })
    },
    updateQuantity (event) {
      this.updateCart({
        item: this.cartItem,
        quantity: parseInt(event.target.value),
        isAdd: false
      })
    }
  }
}
</script>

<style scoped>

</style>
