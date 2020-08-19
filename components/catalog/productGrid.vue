<template>
  <div class="margin-bottom">
    <div class="product uk-card uk-card-default uk-card-body uk-padding-small">
      <div class="uk-card-media-top link uk-text-center" @click="link">
        <img v-if="product.images.length" :data-src="product.images[0].medium" alt="" uk-img>
        <img v-else data-src="/no-image.png" alt="" uk-img>
      </div>
      <div class="uk-card-body">
        <h3 class="uk-card-title link uk-text-center" @click="link">{{ product.title }}</h3>
        <div class="uk-text-center">
          <div class="uk-text-large uk-text-center uk-text-bold uk-margin-small-top uk-margin-small-bottom">{{ product.price | currency }}</div>
          <button class="uk-button uk-button-default uk-border-rounded uk-width-1-1" @click="addItemToCart">Заказать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: "productGrid",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations('cart', {
      addToCart: 'setCart'
    }),
    addItemToCart () {
      this.addToCart({ ...this.product, quantity: 1 })
      this.$message(`Товар ${this.product.title} добавлен в корзину`)
    },
    link () {
      this.$router.push({ path: '/catalog/' + this.product.url })
    }
  }
}
</script>

<style lang="scss" scoped>
  .link {
    cursor: pointer;
    font-size: 18px;
  }
  .margin-bottom {
    margin-bottom: 15px;
  }
  .product:hover {
    .uk-card-title:hover {
      color: #f0506e;
    }
    button {
      background-color: #f0506e;
      color: #fff;
      border: 1px solid transparent;
    }
    button:hover {
      background-color: #ee395b;
      color: #fff;
    }
  }
</style>
