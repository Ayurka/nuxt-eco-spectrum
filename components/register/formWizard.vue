<template>
  <div>
    <ul class="steps has-content-centered">
      <li class="steps-segment"
          v-for="tab in tabs"
          :key="tab.name"
          :class="{ 'is-active': tab.isActive }"
      >
        <span class="steps-marker"></span>
        <div class="steps-content">
          <p class="is-size-4">{{ tab.name }}</p>
          <p>{{ tab.info }}</p>
        </div>
      </li>
    </ul>
    <hr>
    <div class="tab-details">
      <slot
        :formUser="formUser"
        :formCompany="formCompany"
        :vFormUser="$v.formUser"
        :vFormCompany="$v.formCompany"
      ></slot>
    </div>
    <div class="field is-grouped">
      <div class="control uk-width-1-2" v-if="currentActive > 0">
        <button @click="previousTab" class="uk-button uk-button-primary uk-border-rounded uk-width">Назад</button>
      </div>
      <div class="control uk-width-1-1@s uk-width-1-2@l" v-if="currentActive < totalTabs - 1">
        <button @click="nextTab" class="uk-button uk-button-primary uk-border-rounded uk-width">Вперед</button>
      </div>
      <div class="control uk-width-1-2" v-if="currentActive === totalTabs - 1" >
        <button @click.prevent="register" class="uk-button uk-button-green uk-text-secondary uk-border-rounded uk-width">Регистрация</button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, numeric } from 'vuelidate/lib/validators'

export default {
  name: 'formWizard',
  data: () => ({
    tabs: [],
    currentActive: 0,
    totalTabs: 0,
    formUser: {
      name: null,
      email: null,
      phone: null,
      password: null
    },
    formCompany: {
      selectedType: 'ООО',
      options: [
        { text: 'ООО', value: 'ООО' },
        { text: 'ИП', value: 'ИП' }
      ],
      ooo: {
        inn: null,
        nameCompany: null,
        address: null,
        kpp: null,
        ogrn: null,
        agree: true
      },
      ip: {
        inn: null,
        nameCompany: null,
        address: null,
        ogrnip: null,
        agree: true
      }
    }
  }),
  validations: {
    formUser: {
      name: { required },
      email: { required, email },
      phone: { required },
      password: { required, minLength: minLength(4) }
    },
    formCompany: {
      ooo: {
        inn: { required, numeric, minLength: minLength(10) },
        nameCompany: { required },
        address: { required },
        kpp: { required },
        ogrn: { required },
        agree: { checked: (v) => v }
      },
      ip: {
        inn: { required, numeric, minLength: minLength(12) },
        nameCompany: { required },
        address: { required },
        ogrnip: { required },
        agree: { checked: (v) => v }
      }
    }
  },
  created () {
    this.tabs = this.$children
  },
  mounted () {
    this.totalTabs = this.tabs.length
  },
  methods: {
    previousTab () {
      this.currentActive--
      this.tabs.forEach(tab => {
        tab.isActive = false
      })
      this.tabs[this.currentActive].isActive = true
    },
    nextTab () {
      if (this.$v.formUser.$invalid) {
        this.$v.formUser.$touch()
        return
      }
      this.currentActive++
      this.tabs.forEach(tab => {
        tab.isActive = false
      })

      this.tabs[this.currentActive].isActive = true
    },
    async register () {
      if (this.formCompany.selectedType === 'ООО') {
        if (this.$v.formCompany.ooo.$invalid) {
          this.$v.formCompany.ooo.$touch()
          return
        }
        try {
          await this.$axios.$post('/auth/register', { ...this.formUser, typeCompany: this.formCompany.selectedType, company: this.formCompany.ooo });
          this.$auth.login({ data: this.formUser });
          this.$router.push({ name: 'account' });
        } catch (e) {
          this.$error(e.response.data.message);
          throw e;
        }
      } else {
        if (this.$v.formCompany.ip.$invalid) {
          this.$v.formCompany.ip.$touch()
          return
        }
        try {
          await this.$axios.$post('/auth/register', { ...this.formUser, typeCompany: this.formCompany.selectedType, company: this.formCompany.ip });
          this.$auth.login({ data: this.formUser });
          this.$router.push({ name: 'account' });
        } catch (e) {
          this.$error(e.response.data.message);
          throw e;
        }
      }
    }
  }
}
</script>

<style scoped>
  .steps:not(.is-hollow) .steps-segment.is-active .steps-marker:not(.is-hollow) {
    background-color: #9EEA6A;
  }
  .steps:not(.is-hollow) .steps-marker:not(.is-hollow) {
    background-color: #9EEA6A;
  }
  .steps-segment:after {
    background-color: #9EEA6A;
  }
</style>
