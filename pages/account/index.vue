<template>
  <div class="uk-section uk-padding-remove-top" uk-height-viewport="expand: true">
    <div style="background-color:#eff3f7;">
      <div class="uk-container uk-container-large uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
        <ul class="uk-breadcrumb uk-margin-small-top uk-margin-small-bottom">
          <nuxt-link tag="li" :to="{ name: 'index' }"><a>Главная</a></nuxt-link>
          <li>
            <a @click.prevent>Личный кабинет</a>
          </li>
        </ul>
        <search-product />
      </div>
    </div>
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-bullet h1-title">Личный кабинет</h1>
      <div uk-grid>
        <left-menu />
        <div class="uk-width-expand@m">
          <div class="uk-card uk-card-default uk-card-body">
            <form @submit.prevent="handleSubmit" class="uk-form-horizontal uk-margin-large">
              <div class="uk-margin">
                <inputText
                  label="Имя"
                  :v="$v.user.name"
                  v-model="user.name"
                />
              </div>
              <div class="uk-margin">
                <inputEmail
                  label="E-mail"
                  :v="$v.user.email"
                  v-model="user.email"
                />
              </div>
              <div class="uk-margin">
                <inputText
                  label="Телефон"
                  :v="$v.user.phone"
                  v-model="user.phone"
                />
              </div>
              <div class="uk-margin uk-text-right">
                <button type="submit" class="uk-button uk-button-green uk-border-rounded">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tokenHasExpired from "~/plugins/mixins/tokenHasExpired";
import { email, required, minLength } from 'vuelidate/lib/validators';
import leftMenu from "~/components/account/leftMenu";
import inputText from '~/components/form/inputText';
import inputEmail from '~/components/form/inputEmail';
import searchProduct from "~/components/catalog/searchProduct";

export default {
  name: 'index',
  middleware: 'auth',
  mixins: [tokenHasExpired],
  components: {
    leftMenu, inputText, inputEmail, searchProduct
  },
  data: () => ({
    user: {
      name: '',
      email: '',
      phone: ''
    }
  }),
  validations: {
    user: {
      name: { required, minLength: minLength(3) },
      email: { required, email },
      phone: { required }
    }
  },
  async mounted () {
    try {
      this.user.name = this.$auth.user.name;
      this.user.email = this.$auth.user.email;
      this.user.phone = this.$auth.user.phone;
    } catch (e) {
      await this.$router.push({ name: 'login' });
      throw e;
    }
  },
  methods: {
    async handleSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.$store.dispatch('account/editAccount', this.user);
        this.$message('Ваша учетная запись успешно изменена!');
      } catch (e) {
        this.$error(e.response.data.message);
      }
    }
  }
}
</script>

<style scoped>
  .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before {
    margin: 0 10px;
  }
</style>
