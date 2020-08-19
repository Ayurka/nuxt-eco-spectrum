<template>
  <div class="uk-section uk-padding-remove-top" uk-height-viewport="expand: true">
    <div style="background-color:#eff3f7;">
      <div class="uk-container uk-container-large uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
        <ul class="uk-breadcrumb uk-margin-small-top uk-margin-small-bottom">
          <nuxt-link tag="li" :to="{ name: 'index' }"><a>Главная</a></nuxt-link>
          <li>
            <a @click.prevent>Оформление заказа</a>
          </li>
        </ul>
        <search-product />
      </div>
    </div>
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-bullet h1-title">Оформление заказа</h1>
      <div v-if="!success">
        <div uk-grid v-if="cartItemList.length">
          <div class="uk-width-expand@m">
            <template v-if="!this.$auth.loggedIn">
              <guest @is-checkout-finish="handleStatus" />
            </template>
            <template v-else>
              <client-only>
                <auth @is-checkout-finish="handleStatus" />
              </client-only>
            </template>
          </div>
          <div class="uk-width-1-3@m">
            <div class="uk-card uk-card-default uk-card-body">
              <h2 class="uk-heading-divider uk-text-bold uk-margin-small-bottom">Ваш заказ</h2>
              <ul class="uk-list uk-list-divider">
                <li
                  v-for="product in cartItemList"
                  :key="product.id"
                >
                  <div uk-grid>
                    <div class="uk-width-3-5">
                      <span class="uk-text-small">{{ product.title }}</span>
                    </div>
                    <div class="uk-width-2-5 uk-text-right">
                      <span class="uk-text-small">{{ product.quantity }} x {{ product.price | currency }}</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div uk-grid>
                    <div class="uk-width-3-5">
                      <span class="uk-text-small uk-text-bold">Сумма заказа</span>
                    </div>
                    <div class="uk-width-2-5 uk-text-right">
                      <span class="uk-text-small uk-text-bold">{{ cartTotal | currency }}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p v-else>Нет товаров для оформления заказа</p>
      </div>
      <p v-else><span uk-icon="icon: check" class="uk-text-success"></span> Ваш заказ успешно оформлен!</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import guest from "~/components/checkout/form/guest";
import auth from '~/components/checkout/form/auth';
import searchProduct from "~/components/catalog/searchProduct";

export default {
  name: 'checkout',
  components: {
    guest, auth, searchProduct
  },
  data: () => ({
    success: false
  }),
  computed: {
    ...mapGetters('cart', ['cartItemList', 'cartTotal', 'quantityAll']),
  },
  methods: {
    handleStatus (value) {
      this.success = value
    }
  },
  head: {
    title: 'Оформление заказа'
  }
}
</script>

<style scoped>
  .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before {
    margin: 0 10px;
  }
</style>
