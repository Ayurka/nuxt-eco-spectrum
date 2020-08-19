<template>
  <div class="uk-section uk-padding-remove-top" uk-height-viewport="expand: true">
    <div style="background-color:#eff3f7;">
      <div class="uk-container uk-container-large uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
        <ul class="uk-breadcrumb uk-margin-small-top uk-margin-small-bottom">
          <nuxt-link tag="li" :to="{ name: 'index' }"><a>Главная</a></nuxt-link>
          <li>
            <a @click.prevent>Корзина</a>
          </li>
        </ul>
        <search-product />
      </div>
    </div>
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-bullet h1-title">Корзина</h1>
      <div class="uk-card uk-card-default uk-card-body">
        <div v-if="cartItemList.length" class="uk-overflow-auto">
          <table class="uk-table uk-table-justify uk-table-divider">
            <thead>
              <tr>
                <th class="uk-width-auto">Изображение</th>
                <th>Название</th>
                <th>Цена</th>
                <th class="uk-table-expand">Количество</th>
                <th class="uk-table-expand">Сумма</th>
                <th class="uk-table-shrink">Действие</th>
              </tr>
            </thead>
            <tbody>
              <cart-item
                v-for="product in cartItemList"
                :key="product.id"
                :cartItem="product"
              />
            </tbody>
            <tfoot>
              <tr>
                <td colspan="5" class="uk-table-expand"><span class="uk-float-right">Итого:</span></td>
                <td>{{ cartTotal | currency }}</td>
              </tr>
              <tr>
                <td colspan="6">
                  <span class="uk-float-right">
                    <router-link tag="button" to="/checkout" class="uk-button uk-button-primary uk-border-rounded">Оформление заказа</router-link>
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-else><span>Ваша корзина пуста</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import cartItem from '~/components/cartItem';
import searchProduct from "~/components/catalog/searchProduct";

export default {
  name: 'cart',
  components: {
    cartItem, searchProduct
  },
  computed: {
    ...mapGetters('cart', [
      'cartTotal',
      'cartItemList'
    ])
  },
  head: {
    title: 'Корзина'
  }
}
</script>

<style scoped>
  .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before {
    margin: 0 10px;
  }
</style>
