<template>
  <div class="uk-section uk-padding-remove-top" uk-height-viewport="expand: true">
    <div style="background-color:#eff3f7;">
      <div class="uk-container uk-container-large uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
        <ul class="uk-breadcrumb uk-margin-small-top uk-margin-small-bottom">
          <nuxt-link tag="li" :to="{ name: 'index' }"><a>Главная</a></nuxt-link>
          <nuxt-link tag="li" :to="{ name: 'account' }"><a>Личный кабинет</a></nuxt-link>
          <li>
            <a @click.prevent>Реквизиты</a>
          </li>
        </ul>
        <search-product />
      </div>
    </div>
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-bullet h1-title">Реквизиты</h1>
      <div uk-grid>
        <left-menu />
        <div class="uk-width-expand@m">
          <div class="uk-card uk-card-default uk-card-body">
            <form v-if="typeCompany === 'ООО'" @submit.prevent="submitHandler" class="uk-form-horizontal uk-grid-large">
              <div class="uk-margin">
                <inputText
                  label="Наименование организации"
                  :v="$v.ooo.nameCompany"
                  v-model="ooo.nameCompany"
                />
              </div>
              <div class="uk-margin">
                <inputText
                  label="Юридический адрес"
                  :v="$v.ooo.address"
                  v-model="ooo.address"
                />
              </div>
              <div class="uk-margin">
                <inputText
                  label="ИНН"
                  :v="$v.ooo.inn"
                  v-model="ooo.inn"
                />
              </div>
              <div class="uk-margin">
                <inputText
                  label="КПП"
                  :v="$v.ooo.kpp"
                  v-model="ooo.kpp"
                />
              </div>
              <div class="uk-margin">
                <inputText
                  label="ОГРН"
                  :v="$v.ooo.ogrn"
                  v-model="ooo.ogrn"
                />
              </div>
              <div class="uk-margin uk-text-right">
                <button type="submit" class="uk-button uk-button-secondary uk-border-rounded">Сохранить</button>
              </div>
            </form>
            <form v-else @submit.prevent="submitHandler" class="uk-form-horizontal uk-grid-large">
              <div class="uk-margin">
                <inputText
                  label="Наименование организации"
                  :v="$v.ip.nameCompany"
                  v-model="ip.nameCompany"
                />
              </div>
              <div class="uk-margin">
                <inputText
                  label="Юридический адрес"
                  :v="$v.ip.address"
                  v-model="ip.address"
                />
              </div>
              <div class="uk-margin">
                <inputText
                  label="ИНН"
                  :v="$v.ip.inn"
                  v-model="ip.inn"
                />
              </div>
              <div class="uk-margin">
                <inputText
                  label="ОГРНИП"
                  :v="$v.ip.ogrnip"
                  v-model="ip.ogrnip"
                />
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
import { required } from 'vuelidate/lib/validators';
import inputText from '~/components/form/inputText';
import leftMenu from "~/components/account/leftMenu";
import searchProduct from "~/components/catalog/searchProduct";

export default {
  name: 'company',
  middleware: 'auth',
  mixins: [tokenHasExpired],
  components: {
    inputText, leftMenu, searchProduct
  },
  data: () => ({
    typeCompany: '',
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
  mounted () {
    try {
      this.typeCompany = this.$auth.user.typeCompany;
      if (this.typeCompany === 'ООО') {
        this.ooo.nameCompany = this.$auth.user.company.name_company
        this.ooo.address = this.$auth.user.company.address
        this.ooo.inn = this.$auth.user.company.inn
        this.ooo.kpp = this.$auth.user.company.kpp
        this.ooo.ogrn = this.$auth.user.company.ogrn
      } else {
        this.ip.nameCompany = this.$auth.user.company.name_company
        this.ip.address = this.$auth.user.company.address
        this.ip.inn = this.$auth.user.company.inn
        this.ip.ogrnip = this.$auth.user.company.ogrnip
      }
    } catch (e) {
      throw e;
    }
  },
  methods: {
    async submitHandler () {
      if (this.typeCompany === 'ООО') {
        if (this.$v.ooo.$invalid) {
          this.$v.ooo.$touch()
          return
        }
        try {
          await this.$store.dispatch('account/editCompany', this.ooo);
          this.$message('Успешно сохранено!');
        } catch (e) {
          throw e;
        }
      } else {
        if (this.$v.ip.$invalid) {
          this.$v.ip.$touch()
          return
        }
        try {
          await this.$store.dispatch('account/editCompany', this.ip);
          this.$message('Успешно сохранено!');
        } catch (e) {
          throw e;
        }
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
