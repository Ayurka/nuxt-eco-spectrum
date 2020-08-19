<template>
  <div class="uk-section uk-padding-remove-top" uk-height-viewport="expand: true">
    <div style="background-color:#eff3f7;">
      <div class="uk-container uk-container-large uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
        <ul class="uk-breadcrumb uk-margin-small-top uk-margin-small-bottom">
          <nuxt-link tag="li" :to="{ name: 'index' }"><a>Главная</a></nuxt-link>
          <nuxt-link tag="li" :to="{ name: 'account' }"><a>Личный кабинет</a></nuxt-link>
          <li>
            <a @click.prevent>Заказы</a>
          </li>
        </ul>
        <search-product />
      </div>
    </div>
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-bullet h1-title">Заказы</h1>
      <div uk-grid>
        <left-menu />
        <div class="uk-width-expand@m">
          <div class="uk-card uk-card-default uk-card-body">
            <div v-if="getOrders.length" class="uk-overflow-auto">
              <table class="uk-table uk-table-justify uk-table-divider">
                <thead>
                <tr>
                  <th class="uk-table-small">Номер заказа</th>
                  <th class="uk-table-expand">Сумма</th>
                  <th class="uk-table-expand">Количество</th>
                  <th class="uk-table-expand">Статус</th>
                  <th class="uk-table-expand">Дата создания</th>
                  <th class="uk-table-shrink"></th>
                </tr>
                </thead>
                <tbody>
                <order-list
                  v-for="order in getOrders"
                  :key="order.id"
                  :order="order"
                />
                </tbody>
              </table>
            </div>
            <div v-else>У вас нет заказов</div>
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
import orderList from '~/components/account/order/orderList';
import searchProduct from "~/components/catalog/searchProduct";

export default {
  name: 'order',
  middleware: 'auth',
  mixins: [tokenHasExpired],
  components: {
    leftMenu, orderList, searchProduct
  },
  computed: {
    ...mapGetters('order', ['getOrders'])
  },
  async mounted () {
    try {
      await this.$store.dispatch('order/orders');
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
