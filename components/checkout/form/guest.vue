<template>
  <div class="uk-card uk-card-default uk-card-body">
    <form @submit.prevent="submitHandler" class="uk-form-stacked uk-grid-medium" uk-grid>
      <div class="uk-width">
        <h2 class="uk-heading-divider uk-text-bold uk-margin-small-bottom">Личные данные</h2>
      </div>
      <div class="uk-width-1-3@m">
        <input-text
          label="Имя"
          :v="$v.user.name"
          v-model="user.name"
        />
      </div>
      <div class="uk-width-1-3@m">
        <input-email
          label="E-mail"
          :v="$v.user.email"
          v-model="user.email"
        />
      </div>
      <div class="uk-width-1-3@m">
        <input-phone
          label="Телефон"
          :v="$v.user.phone"
          v-model="user.phone"
        />
      </div>
      <div class="uk-width">
        <h2 class="uk-heading-divider uk-text-bold uk-margin-small-bottom">Реквизиты компании</h2>
      </div>
      <div class="uk-width-1-3@m">
        <input-select
          label="Тип организации"
          :list="company"
          v-model="typeCompany"
        />
      </div>
      <template v-if="typeCompany === 'ИП'">
        <div class="uk-width-1-3@m">
          <input-text
            label="Наименование организации"
            :v="$v.ip.nameCompany"
            v-model="ip.nameCompany"
          />
        </div>
        <div class="uk-width-1-3@m">
          <input-text
            label="Юридический адрес"
            :v="$v.ip.address"
            v-model="ip.address"
          />
        </div>
        <div class="uk-width-1-3@m">
          <input-text
            label="ИНН"
            :v="$v.ip.inn"
            v-model="ip.inn"
          />
        </div>
        <div class="uk-width-1-3@m">
          <input-text
            label="ОГРНИП"
            :v="$v.ip.ogrnip"
            v-model="ip.ogrnip"
          />
        </div>
      </template>
      <template v-else>
        <div class="uk-width-1-3@m">
          <input-text
            label="Наименование организации"
            :v="$v.ooo.nameCompany"
            v-model="ooo.nameCompany"
          />
        </div>
        <div class="uk-width-1-3@m">
          <input-text
            label="Юридический адрес"
            :v="$v.ooo.address"
            v-model="ooo.address"
          />
        </div>
        <div class="uk-width-1-3@m">
          <input-text
            label="ИНН"
            :v="$v.ooo.inn"
            v-model="ooo.inn"
          />
        </div>
        <div class="uk-width-1-3@m">
          <input-text
            label="КПП"
            :v="$v.ooo.kpp"
            v-model="ooo.kpp"
          />
        </div>
        <div class="uk-width-1-3@m">
          <input-text
            label="ОГРН"
            :v="$v.ooo.ogrn"
            v-model="ooo.ogrn"
          />
        </div>
      </template>
      <div class="uk-width-1-1 uk-margin">
        <button type="submit" class="uk-button uk-button-primary uk-border-rounded">Оформить заказ</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import {email, required} from 'vuelidate/lib/validators';
import inputText from '~/components/form/inputText';
import inputPhone from "~/components/form/inputPhone";
import inputEmail from "~/components/form/inputEmail";
import inputSelect from "~/components/form/inputSelect";

export default {
  name: "guest",
  components: {
    inputText, inputPhone, inputEmail, inputSelect
  },
  data: () => ({
    user: {
      name: '',
      email: '',
      phone: ''
    },
    company: [
      { id: 1, name: 'ООО', selected: true },
      { id: 2, name: 'ИП' }
    ],
    typeCompany: 'ООО',
    ooo: {
      nameCompany: '',
      address: '',
      inn: '',
      kpp: '',
      ogrn: ''
    },
    ip: {
      nameCompany: '',
      address: '',
      inn: '',
      ogrnip: ''
    }
  }),
  validations: {
    user: {
      name: { required },
      email: { required, email },
      phone: { required },
    },
    typeCompany: { required },
    ooo: {
      nameCompany: { required },
      address: { required },
      inn: { required },
      kpp: { required },
      ogrn: { required }
    },
    ip: {
      nameCompany: { required },
      address: { required },
      inn: { required },
      ogrnip: { required }
    }
  },
  computed: {
    ...mapGetters('cart', ['products', 'cartTotal', 'quantityAll'])
  },
  methods: {
    ...mapMutations('cart', ['clearCart']),
    async submitHandler () {
      if (this.typeCompany === "ООО") {
        if (this.$v.ooo.$invalid && this.$v.user.$invalid) {
          this.$v.ooo.$touch()
          this.$v.user.$touch()
          return
        }
        try {
          await this.$store.dispatch('order/orderStoreGuest', {
            ...this.user,
            typeCompany: this.typeCompany,
            company: this.ooo,
            products: this.products,
            total: this.cartTotal,
            quantity: this.quantityAll
          });
          this.clearCart()
          this.$emit('is-checkout-finish', true)
        } catch (e) {
          throw e;
        }
      } else {
        if (this.$v.ip.$invalid && this.$v.user.$invalid) {
          this.$v.ip.$touch()
          this.$v.user.$touch()
          return
        }
        try {
          await this.$store.dispatch('order/orderStoreGuest', {
            ...this.user,
            typeCompany: this.typeCompany,
            company: this.ip,
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
}
</script>

<style scoped>

</style>
