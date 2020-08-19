<template>
  <div class="uk-card uk-card-default uk-card-body">
    <h2 class="uk-heading-divider uk-text-bold uk-margin-small-bottom heading">
      Личные данные
      <nuxt-link :to="{ name: 'account' }" class="uk-link-muted uk-text-small">редактировать</nuxt-link>
    </h2>
    <ul class="uk-list uk-list-striped">
      <li>
        <div uk-grid>
          <div class="uk-width-2-5">
            <span class="uk-text-small uk-text-bold">Имя:</span>
          </div>
          <div class="uk-width-3-5">
            <span class="uk-text-small">{{ this.$auth.user.name }}</span>
          </div>
        </div>
      </li>
      <li>
        <div uk-grid>
          <div class="uk-width-2-5">
            <span class="uk-text-small uk-text-bold">E-mail:</span>
          </div>
          <div class="uk-width-3-5">
            <span class="uk-text-small">{{ this.$auth.user.email }}</span>
          </div>
        </div>
      </li>
      <li>
        <div uk-grid>
          <div class="uk-width-2-5">
            <span class="uk-text-small uk-text-bold">Телефон:</span>
          </div>
          <div class="uk-width-3-5">
            <span class="uk-text-small">{{ this.$auth.user.phone }}</span>
          </div>
        </div>
      </li>
    </ul>
    <h2 class="uk-heading-divider uk-text-bold uk-margin-small-bottom uk-margin-medium-top heading">
      Реквизиты компании
      <nuxt-link :to="{ name: 'account-company' }" class="uk-link-muted uk-text-small">редактировать</nuxt-link>
    </h2>
    <template v-if="this.$auth.user.typeCompany === 'ООО'">
      <ul class="uk-list uk-list-striped">
        <li>
          <div uk-grid>
            <div class="uk-width-2-5">
              <span class="uk-text-small uk-text-bold">Наименование организации:</span>
            </div>
            <div class="uk-width-3-5">
              <span class="uk-text-small">{{ this.$auth.user.company.name_company }}</span>
            </div>
          </div>
        </li>
        <li>
          <div uk-grid>
            <div class="uk-width-2-5">
              <span class="uk-text-small uk-text-bold">Юридический адрес:</span>
            </div>
            <div class="uk-width-3-5">
              <span class="uk-text-small">{{ this.$auth.user.company.address }}</span>
            </div>
          </div>
        </li>
        <li>
          <div uk-grid>
            <div class="uk-width-2-5">
              <span class="uk-text-small uk-text-bold">ИНН:</span>
            </div>
            <div class="uk-width-3-5">
              <span class="uk-text-small">{{ this.$auth.user.company.inn }}</span>
            </div>
          </div>
        </li>
        <li>
          <div uk-grid>
            <div class="uk-width-2-5">
              <span class="uk-text-small uk-text-bold">КПП:</span>
            </div>
            <div class="uk-width-3-5">
              <span class="uk-text-small">{{ this.$auth.user.company.kpp }}</span>
            </div>
          </div>
        </li>
        <li>
          <div uk-grid>
            <div class="uk-width-2-5">
              <span class="uk-text-small uk-text-bold">ОГРН:</span>
            </div>
            <div class="uk-width-3-5">
              <span class="uk-text-small">{{ this.$auth.user.company.ogrn }}</span>
            </div>
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <ul class="uk-list uk-list-divider">
        <li>
          <div uk-grid>
            <div class="uk-width-2-5">
              <span class="uk-text-small uk-text-bold">Наименование организации:</span>
            </div>
            <div class="uk-width-3-5">
              <span class="uk-text-small">{{ this.$auth.user.company.name_company }}</span>
            </div>
          </div>
        </li>
        <li>
          <div uk-grid>
            <div class="uk-width-2-5">
              <span class="uk-text-small uk-text-bold">Юридический адрес:</span>
            </div>
            <div class="uk-width-3-5">
              <span class="uk-text-small">{{ this.$auth.user.company.address }}</span>
            </div>
          </div>
        </li>
        <li>
          <div uk-grid>
            <div class="uk-width-2-5">
              <span class="uk-text-small uk-text-bold">ИНН:</span>
            </div>
            <div class="uk-width-3-5">
              <span class="uk-text-small">{{ this.$auth.user.company.inn }}</span>
            </div>
          </div>
        </li>
        <li>
          <div uk-grid>
            <div class="uk-width-2-5">
              <span class="uk-text-small uk-text-bold">ОГРНИП:</span>
            </div>
            <div class="uk-width-3-5">
              <span class="uk-text-small">{{ this.$auth.user.company.ogrnip }}</span>
            </div>
          </div>
        </li>
      </ul>
    </template>
    <button @click.prevent="submitHandler" class="uk-button uk-button-primary uk-border-rounded uk-margin-medium-top">Оформить заказ</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import inputText from '~/components/form/inputText';
import inputPhone from "~/components/form/inputPhone";

export default {
  name: "auth",
  components: {
    inputText, inputPhone
  },
  computed: {
    ...mapGetters('cart', ['products', 'cartTotal', 'quantityAll'])
  },
  methods: {
    ...mapMutations('cart', ['clearCart']),
    async submitHandler () {
      try {
        await this.$store.dispatch('order/orderStoreAuth', {
          ...this.$auth.user,
          products: this.products,
          total: this.cartTotal,
          quantity: this.quantityAll
        });
        this.clearCart()
        this.$emit('is-checkout-finish', true)
      } catch (e) {
        throw e;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
