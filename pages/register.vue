<template>
  <div class="uk-section uk-padding-remove-top" uk-height-viewport="expand: true">
    <div style="background-color:#eff3f7;">
      <div class="uk-container uk-container-large uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
        <ul class="uk-breadcrumb uk-margin-small-top uk-margin-small-bottom">
          <nuxt-link tag="li" :to="{ name: 'index' }"><a>Главная</a></nuxt-link>
          <li>
            <a @click.prevent>Регистрация</a>
          </li>
        </ul>
        <search-product />
      </div>
    </div>
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-bullet h1-title h1-title-register">Регистрация</h1>
      <div class="uk-card uk-card-default uk-card-body uk-width-1-3@m uk-margin-auto">
        <div class="uk-grid-divider uk-child-width-expand@s" uk-grid>
          <form-wizard>
            <template v-slot="{ formUser, vFormUser, formCompany, vFormCompany }">
              <tab name="Шаг 1" info="Пользователь" :selected="true">
                <user-information :v="vFormUser" v-model="formUser" />
              </tab>
              <tab name="Шаг 2" info="Компания">
                <company-details :v="vFormCompany" v-model="formCompany" />
              </tab>
            </template>
          </form-wizard>
        </div>
        <hr>
        <div class="uk-margin">
          <p class="uk-text-small uk-text-center">Уже есть аккаунт? <router-link to="/login" class="uk-text-small">Войти!</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formWizard from "~/components/register/formWizard";
import tab from "~/components/register/tab";
import userInformation from "~/components/register/userInformation";
import companyDetails from "~/components/register/companyDetails";
import searchProduct from "~/components/catalog/searchProduct";

export default {
  name: 'register',
  middleware: 'guest',
  components: {
    userInformation,
    companyDetails,
    formWizard,
    tab,
    searchProduct
  },
  head: {
    title: 'Регистрация'
  }
}
</script>

<style lang="scss">
  @import '../node_modules/bulma/bulma.sass';
  @import '../node_modules/bulma-steps-component/bulma-steps.sass';

  .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before {
    margin: 0 10px;
  }
</style>
