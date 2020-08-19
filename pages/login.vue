<template>
  <div class="uk-section uk-padding-remove-top" uk-height-viewport="expand: true">
    <div style="background-color:#eff3f7;">
      <div class="uk-container uk-container-large uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
        <ul class="uk-breadcrumb uk-margin-small-top uk-margin-small-bottom">
          <nuxt-link tag="li" :to="{ name: 'index' }"><a>Главная</a></nuxt-link>
          <li>
            <a @click.prevent>Войти</a>
          </li>
        </ul>
        <search-product />
      </div>
    </div>
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-bullet h1-title">Войти</h1>
      <div class="uk-card uk-card-default uk-card-body uk-width-1-3@m uk-margin-auto">
        <form @submit.prevent="handleSubmit" class="uk-form-stacked uk-margin-large">

          <div class="uk-margin">
            <label class="uk-form-label" for="login-email">E-mail</label>
            <div class="uk-form-controls">
              <input
                class="uk-input"
                type="text"
                id="login-email"
                v-model.trim="email"
                :class="{ 'uk-form-danger': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
              >
              <span
                class="uk-text-danger uk-text-small"
                v-if="$v.email.$dirty && !$v.email.required"
              >Введите email</span>
              <span
                class="uk-text-danger uk-text-small"
                v-else-if="$v.email.$dirty && !$v.email.email"
              >Введите корректный E-mail</span>
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label" for="login-password">Пароль</label>
            <div class="uk-form-controls">
              <input
                class="uk-input"
                type="password"
                id="login-password"
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
            <button type="submit" class="uk-button uk-button-green uk-text-secondary uk-margin-small-bottom uk-border-rounded">Войти</button>
            <p class="uk-text-small">Еще нет учетной записи? <router-link to="/register" class="uk-text-small">Зарегистрироваться!</router-link></p>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
import searchProduct from "~/components/catalog/searchProduct";

export default {
  name: 'login',
  components: {
    searchProduct
  },
  middleware: 'guest',
  data: () => ({
    email: null,
    password: null,
    password_confirmation: null
  }),
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(4) }
  },
  methods: {
    async handleSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return;
      }

      try {
        await this.$auth.login({ data: {email: this.email, password: this.password}});
        await this.$router.push({ name: 'account' });
      } catch (e) {
        this.$error('Неправильно ввели логин или пароль');
      }
    }
  },
  head: {
    title: 'Войти'
  }
}
</script>

<style scoped>
  .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before {
    margin: 0 10px;
  }
</style>
