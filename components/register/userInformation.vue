<template>
  <div>
    <form class="uk-form-stacked uk-margin-small">
      <div class="uk-margin">
        <label class="uk-form-label" for="register-name">Имя</label>
        <div class="uk-form-controls">
          <input
            class="uk-input"
            type="text"
            id="register-name"
            v-model.trim="formUser.name"
            :class="{ 'uk-form-danger': v.name.$dirty && !v.name.required }"
          >
          <span
            class="uk-text-danger uk-text-small"
            v-if="v.name.$dirty && !v.name.required"
          >Введите имя</span>
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="register-email">E-mail</label>
        <div class="uk-form-controls">
          <input
            class="uk-input"
            type="text"
            id="register-email"
            v-model.trim="formUser.email"
            :class="{ 'uk-form-danger': (v.email.$dirty && !v.email.required) || (v.email.$dirty && !v.email.email) }"
          >
          <span
            class="uk-text-danger uk-text-small"
            v-if="v.email.$dirty && !v.email.required"
          >Введите email</span>
          <span
            class="uk-text-danger uk-text-small"
            v-else-if="v.email.$dirty && !v.email.email"
          >Введите корректный E-mail</span>
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="register-phone">Телефон</label>
        <div class="uk-form-controls">
          <input
            class="uk-input"
            type="text"
            id="register-phone"
            v-model.trim="formUser.phone"
            v-mask="'+7(###)###-##-##'"
            placeholder="+7(___)___-__-__"
            :class="{ 'uk-form-danger': v.phone.$dirty && !v.phone.required }"
          >
          <span
            class="uk-text-danger uk-text-small"
            v-if="v.phone.$dirty && !v.phone.required"
          >Введите телефон</span>
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="register-password">Пароль</label>
        <div class="uk-form-controls">
          <input
            class="uk-input"
            type="password"
            id="register-password"
            v-model.trim="formUser.password"
            :class="{ 'uk-form-danger': (v.password.$dirty && !v.password.required) || (v.password.$dirty && !v.password.minLength) }"
          >
          <span
            class="uk-text-danger uk-text-small"
            v-if="v.password.$dirty && !v.password.required"
          >Введите пароль</span>
          <span
            class="uk-text-danger uk-text-small"
            v-if="v.password.$dirty && !v.password.minLength"
          >Пароль должен быть не менее {{ v.password.$params.minLength.min }} символов. Сейчас {{ formUser.password.length }}</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'userInformation',
  props: {
    value: {
      type: Object
    },
    v: {
      type: Object,
      required: true
    }
  },
  computed: {
    formUser: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('onChangeUser', value)
      }
    }
  }
}
</script>

<style scoped>

</style>
