<template>
  <div class="uk-section uk-padding-remove-top" uk-height-viewport="expand: true">
    <div style="background-color:#eff3f7;">
      <div class="uk-container uk-container-large uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
        <ul class="uk-breadcrumb uk-margin-small-top uk-margin-small-bottom">
          <nuxt-link tag="li" :to="{ name: 'index' }"><a>Главная</a></nuxt-link>
          <nuxt-link tag="li" :to="{ name: 'account' }"><a>Личный кабинет</a></nuxt-link>
          <li>
            <a @click.prevent>Изменить пароль</a>
          </li>
        </ul>
        <search-product />
      </div>
    </div>
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-bullet h1-title">Изменить пароль</h1>
      <div uk-grid>
        <left-menu />
        <div class="uk-width-expand@m">
          <div class="uk-card uk-card-default uk-card-body">
            <form @submit.prevent="handleSubmit" class="uk-form-horizontal uk-margin-large">
              <div class="uk-margin">
                <label class="uk-form-label" for="register-password">Пароль</label>
                <div class="uk-form-controls">
                  <input
                    class="uk-input"
                    type="password"
                    id="register-password"
                    v-model.trim="password"
                    :class="{ 'uk-form-danger': ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }"
                  >
                  <span
                    class="uk-text-danger uk-text-small"
                    v-if="$v.password.$dirty && !$v.password.required"
                  >Введите пароль</span>
                  <span
                    class="uk-text-danger uk-text-small"
                    v-if="$v.password.$dirty && !$v.password.minLength"
                  >Пароль должен быть не менее {{ $v.password.$params.minLength.min }} символов. Сейчас {{ password.length }}</span>
                </div>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label" for="register-confirm">Повторите пароль</label>
                <div class="uk-form-controls">
                  <input
                    class="uk-input"
                    type="password"
                    id="register-confirm"
                    v-model.trim="password_confirmation"
                    :class="{ 'uk-form-danger': ($v.password_confirmation.$dirty && !$v.password_confirmation.required) || ($v.password_confirmation.$dirty && !$v.password_confirmation.sameAsPassword) }"
                  >
                  <span
                    class="uk-text-danger uk-text-small"
                    v-if="$v.password_confirmation.$dirty && !$v.password_confirmation.required"
                  >Повторите пароль</span>
                  <span
                    class="uk-text-danger uk-text-small"
                    v-if="$v.password_confirmation.$dirty && !$v.password_confirmation.sameAsPassword"
                  >Пароли должны быть идентичны</span>
                </div>
              </div>
              <div class="uk-margin uk-text-right">
                <button type="submit" class="uk-button uk-button-secondary uk-border-rounded">Сохранить</button>
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
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import leftMenu from "~/components/account/leftMenu";
import searchProduct from "~/components/catalog/searchProduct";

export default {
  name: 'password',
  middleware: 'auth',
  mixins: [tokenHasExpired],
  components: {
    leftMenu, searchProduct
  },
  data: () => ({
    password: '',
    password_confirmation: ''
  }),
  validations: {
    password: { required, minLength: minLength(4) },
    password_confirmation: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    async handleSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.$store.dispatch('account/editPassword', {
          password: this.password,
          password_confirmation: this.password_confirmation
        });
        this.password = ''
        this.password_confirmation = ''
        this.$message('Ваш пароль успешно изменен!')
      } catch (e) {
        this.$error(e.response.data.errors.password);
        throw e;
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
