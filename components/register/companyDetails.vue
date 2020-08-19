<template>
  <div>
    <form class="uk-form-stacked uk-margin-small">
      <div class="uk-margin">
        <div class="uk-form-controls">
          <label class="uk-form-label" for="register-type">Тип организации</label>
          <select class="uk-select" v-model="formCompany.selectedType" id="register-type">
            <option v-for="(option, index) of formCompany.options" :key="index" :value="option.value">{{ option.text }}</option>
          </select>
        </div>
      </div>
      <div v-if="formCompany.selectedType === 'ООО'">
        <div class="uk-grid uk-grid-small" uk-grid>
          <div class="uk-width-expand">
            <small>Автозаполнение по ИНН</small>
          </div>
          <div class="uk-width-auto">
            <label class="uk-switch" for="default-3">
              <input type="checkbox" id="default-3" v-model="isCompanySearch">
              <div class="uk-switch-slider uk-switch-big"></div>
            </label>
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="register-inn">ИНН</label>
          <div class="uk-form-controls">
            <div class="uk-grid uk-grid-collapse uk-child-width-expand@s">
              <div>
                <input
                  class="uk-input"
                  type="text"
                  id="register-inn"
                  maxlength="10"
                  v-model.trim="formCompany.ooo.inn"
                  :class="{ 'uk-form-danger': (v.ooo.inn.$dirty && !v.ooo.inn.required)
                  || (v.ooo.inn.$dirty && !v.ooo.inn.numeric)
                  || (v.ooo.inn.$dirty && !v.ooo.inn.minLength) }"
                >
              </div>
              <div>
                <button v-if="isCompanySearch" type="button" @click="onSearchCompanyByInn" class="uk-button uk-button-primary">Найти</button>
              </div>
            </div>
            <span
              class="uk-text-danger uk-text-small"
              v-if="v.ooo.inn.$dirty && !v.ooo.inn.required"
            >Введите ИНН<br></span>
            <span
              class="uk-text-danger uk-text-small"
              v-if="(v.ooo.inn.$dirty && !v.ooo.inn.numeric) || (v.ooo.inn.$dirty && !v.ooo.inn.minLength)"
            >ИНН должен составлять из 10 арабских цифр</span>
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="register-nameCompany">Название организации</label>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              type="text"
              id="register-nameCompany"
              v-model.trim="formCompany.ooo.nameCompany"
              :class="{ 'uk-form-danger': v.ooo.nameCompany.$dirty && !v.ooo.nameCompany.required }"
            >
            <span
              class="uk-text-danger uk-text-small"
              v-if="v.ooo.nameCompany.$dirty && !v.ooo.nameCompany.required"
            >Введите название организации</span>
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="register-address">Юридический адрес</label>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              type="text"
              id="register-address"
              v-model.trim="formCompany.ooo.address"
              :class="{ 'uk-form-danger': v.ooo.address.$dirty && !v.ooo.address.required }"
            >
            <span
              class="uk-text-danger uk-text-small"
              v-if="v.ooo.address.$dirty && !v.ooo.address.required"
            >Введите юридический адрес</span>
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="register-kpp">КПП</label>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              type="text"
              id="register-kpp"
              v-model.trim="formCompany.ooo.kpp"
              :class="{ 'uk-form-danger': v.ooo.kpp.$dirty && !v.ooo.kpp.required }"
            >
            <span
              class="uk-text-danger uk-text-small"
              v-if="v.ooo.kpp.$dirty && !v.ooo.kpp.required"
            >Введите КПП</span>
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="register-ogrn">ОГРН</label>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              type="text"
              id="register-ogrn"
              v-model.trim="formCompany.ooo.ogrn"
              :class="{ 'uk-form-danger': v.ooo.ogrn.$dirty && !v.ooo.ogrn.required }"
            >
            <span
              class="uk-text-danger uk-text-small"
              v-if="v.ooo.ogrn.$dirty && !v.ooo.ogrn.required"
            >Введите ОГРН</span>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="uk-grid uk-grid-small" uk-grid>
          <div class="uk-width-expand">
            <small>Автозаполнение по ИНН</small>
          </div>
          <div class="uk-width-auto">
            <label class="uk-switch" for="ip-search-inn">
              <input type="checkbox" id="ip-search-inn" v-model="isCompanySearch">
              <div class="uk-switch-slider uk-switch-big"></div>
            </label>
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="ipp-inn">ИНН</label>
          <div class="uk-form-controls">
            <div class="uk-grid uk-grid-collapse uk-child-width-expand@s">
              <div>
                <input
                  class="uk-input"
                  type="text"
                  id="ipp-inn"
                  maxlength="12"
                  v-model.trim="formCompany.ip.inn"
                  :class="{ 'uk-form-danger': (v.ip.inn.$dirty && !v.ip.inn.required)
                  || (v.ip.inn.$dirty && !v.ip.inn.numeric)
                  || (v.ip.inn.$dirty && !v.ip.inn.minLength) }"
                >
              </div>
              <div>
                <button v-if="isCompanySearch" type="button" @click="onSearchCompanyByInn" class="uk-button uk-button-primary">Найти</button>
              </div>
            </div>
            <span
              class="uk-text-danger uk-text-small"
              v-if="v.ip.inn.$dirty && !v.ip.inn.required"
            >Введите ИНН</span>
            <span
              class="uk-text-danger uk-text-small"
              v-if="(v.ip.inn.$dirty && !v.ip.inn.numeric) || (v.ip.inn.$dirty && !v.ip.inn.minLength)"
            >ИНН должен составлять из 12 арабских цифр</span>
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="ip-nameCompany">Фамилия и Имя</label>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              type="text"
              id="ip-nameCompany"
              v-model.trim="formCompany.ip.nameCompany"
              :class="{ 'uk-form-danger': v.ip.nameCompany.$dirty && !v.ip.nameCompany.required }"
            >
            <span
              class="uk-text-danger uk-text-small"
              v-if="v.ip.nameCompany.$dirty && !v.ip.nameCompany.required"
            >Введите Фамилию и Имя</span>
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="ip-address">Юридический адрес</label>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              type="text"
              id="ip-address"
              v-model.trim="formCompany.ip.address"
              :class="{ 'uk-form-danger': v.ip.address.$dirty && !v.ip.address.required }"
            >
            <span
              class="uk-text-danger uk-text-small"
              v-if="v.ip.address.$dirty && !v.ip.address.required"
            >Введите юридический адрес</span>
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="ip-ogrn">ОГРНИП</label>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              type="text"
              id="ip-ogrn"
              v-model.trim="formCompany.ip.ogrnip"
              :class="{ 'uk-form-danger': v.ip.ogrnip.$dirty && !v.ip.ogrnip.required }"
            >
            <span
              class="uk-text-danger uk-text-small"
              v-if="v.ip.ogrnip.$dirty && !v.ip.ogrnip.required"
            >Введите ОГРНИП</span>
          </div>
        </div>
      </div>
      <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
        <label><input class="uk-checkbox" type="checkbox" v-model="formCompany.ip.agree" checked> С правилами согласен</label>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'companyDetails',
  props: {
    value: {
      type: Object
    },
    v: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    isCompanySearch: false
  }),
  computed: {
    formCompany: {
      get () {
        return this.value
      }
    }
  },
  methods: {
    async onSearchCompanyByInn () {
      if (this.formCompany.selectedType === 'ООО') {
        if (this.v.ooo.inn.$invalid) {
          this.v.ooo.inn.$touch();
          return;
        }
      } else {
        if (this.v.ip.inn.$invalid) {
          this.v.ip.inn.$touch();
          return;
        }
      }

      try {
        const company = await this.$store.dispatch('account/getCompanyByInn',
          (this.formCompany.selectedType === 'ООО')
            ? { inn: this.formCompany.ooo.inn, type: 'ooo' }
            : { inn: this.formCompany.ip.inn, type: 'ip' }
        );
        if (this.formCompany.selectedType === 'ООО') {
          this.formCompany.ooo.inn = company.inn;
          this.formCompany.ooo.nameCompany = company.name.short_with_opf;
          this.formCompany.ooo.address = company.address.value;
          this.formCompany.ooo.kpp = company.kpp;
          this.formCompany.ooo.ogrn = company.ogrn;
        } else {
          this.formCompany.ip.inn = company.inn;
          this.formCompany.ip.nameCompany = company.name.short_with_opf;
          this.formCompany.ip.address = company.address.value;
          this.formCompany.ip.ogrnip = company.ogrn;
        }
      } catch (e) {
        this.formCompany.ooo.inn = null;
        this.formCompany.ooo.nameCompany = null;
        this.formCompany.ooo.address = null;
        this.formCompany.ooo.kpp = null;
        this.formCompany.ooo.ogrn = null;
        this.formCompany.ip.inn = null;
        this.formCompany.ip.nameCompany = null;
        this.formCompany.ip.address = null;
        this.formCompany.ip.ogrnip = null;
        this.$error('К сожалению ничего не нашли!');
      }
    },
    handleSubmit () {},
    back () {
      this.$emit('handleUserForm', false)
    }
  }
}
</script>

<style scoped>
  /* Switch */

  .uk-switch {
    position: relative;
    display: inline-block;
    height: 34px;
    width: 60px;
  }

  /* Hide default HTML checkbox */
  .uk-switch input {
    display:none;
  }
  /* Slider */
  .uk-switch-slider {
    background-color: rgba(0,0,0,0.22);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 500px;
    bottom: 0;
    cursor: pointer;
    transition-property: background-color;
    transition-duration: .2s;
    box-shadow: inset 0 0 2px rgba(0,0,0,0.07);
  }
  /* Switch pointer */
  .uk-switch-slider:before {
    content: '';
    background-color: #fff;
    position: absolute;
    width: 30px;
    height: 30px;
    left: 2px;
    bottom: 2px;
    border-radius: 50%;
    transition-property: transform, box-shadow;
    transition-duration: .2s;
  }
  /* Slider active color */
  input:checked + .uk-switch-slider {
    background-color: #39f !important;
  }
  /* Pointer active animation */
  input:checked + .uk-switch-slider:before {
    transform: translateX(26px);
  }

  /* Modifiers */
  .uk-switch-slider.uk-switch-on-off {
    background-color: #f0506e;
  }
  input:checked + .uk-switch-slider.uk-switch-on-off {
    background-color: #32d296 !important;
  }

  /* Style Modifier */
  .uk-switch-slider.uk-switch-big:before {
    transform: scale(1.2);
    box-shadow: 0 0 6px rgba(0,0,0,0.22);
  }
  .uk-switch-slider.uk-switch-small:before {
    box-shadow: 0 0 6px rgba(0,0,0,0.22);
  }
  input:checked + .uk-switch-slider.uk-switch-big:before {
    transform: translateX(26px) scale(1.2);
  }

  /* Inverse Modifier - affects only default */
  .uk-light .uk-switch-slider:not(.uk-switch-on-off) {
    background-color: rgba(255,255,255,0.22);
  }
</style>
