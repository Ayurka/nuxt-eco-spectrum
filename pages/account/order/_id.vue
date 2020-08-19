<template>
  <div class="uk-section uk-padding-remove-top" uk-height-viewport="expand: true">
    <div style="background-color:#eff3f7;">
      <div class="uk-container uk-container-large uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
        <ul class="uk-breadcrumb uk-margin-small-top uk-margin-small-bottom">
          <nuxt-link tag="li" :to="{ name: 'index' }"><a>Главная</a></nuxt-link>
          <nuxt-link tag="li" :to="{ name: 'account' }"><a>Личный кабинет</a></nuxt-link>
          <nuxt-link tag="li" :to="{ name: 'account-order' }"><a>Заказы</a></nuxt-link>
          <li>
            <a @click.prevent>№ {{ getOrder.id }}</a>
          </li>
        </ul>
        <search-product />
      </div>
    </div>
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-bullet h1-title">Заказ №{{ getOrder.id }}</h1>
      <div uk-grid>
        <left-menu/>
        <div class="uk-width-expand@m">
          <div class="uk-card uk-card-default uk-card-body">
            <table class="uk-table uk-table-justify uk-table-divider">
              <thead>
              <tr>
                <th class="uk-table-shrink">Изображение</th>
                <th class="uk-table-expand">Название</th>
                <th class="uk-table-shrink">Количество</th>
                <th class="uk-table-shrink">Цена</th>
                <th class="uk-table-shrink">Сумма</th>
              </tr>
              </thead>
              <tbody>
              <orderProductList
                v-for="product of getOrder.products"
                :key="product.id"
                :product="product"
              />
              </tbody>
              <tfoot>
              <tr>
                <td colspan="4" class="uk-table-expand"><span class="uk-float-right">Итого:</span></td>
                <td>{{ getOrder.total | currency }}</td>
              </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tokenHasExpired from "~/plugins/mixins/tokenHasExpired";
import { mapGetters } from 'vuex';
import leftMenu from "~/components/account/leftMenu";
import orderProductList from "~/components/account/order/orderProductList";
import searchProduct from "~/components/catalog/searchProduct";

export default {
  middleware: 'auth',
  mixins: [tokenHasExpired],
  components: {
    leftMenu, orderProductList, searchProduct
  },
  computed: {
    ...mapGetters('order', ['getOrder'])
  },
  async fetch ({ store, params }) {
    try {
      await store.dispatch('order/order', params.id);
    } catch (e) {
      throw e;
    }
  }
}
</script>

<style scoped>
  .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before {
    margin: 0 10px;
  }
</style>
