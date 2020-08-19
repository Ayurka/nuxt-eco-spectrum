<template>
  <fragment>
    <Loader v-if="loading" />
    <form v-else @submit.prevent="handleSubmit" class="uk-form-horizontal uk-margin-large">
      <div class="uk-margin">
        <inputText
          label="Имя"
          :v="$v.name"
          v-model="name"
        />
      </div>
      <div class="uk-margin">
        <inputEmail
          label="E-mail"
          :v="$v.email"
          v-model="email"
        />
      </div>
      <div class="uk-margin">
        <inputText
          label="Телефон"
          :v="$v.phone"
          v-model="phone"
        />
      </div>
      <div class="uk-margin">
        <button type="submit" class="uk-button uk-button-primary uk-border-rounded">Изменить учетные данные</button>
      </div>
    </form>
  </fragment>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import inputText from '~/components/form/inputText'
import inputEmail from '~/components/form/inputEmail'

export default {
  name: 'profile',
  components: {
    inputText, inputEmail
  },
  data: () => ({
    loading: true,
    name: '',
    email: '',
    phone: ''
  }),
  validations: {
    name: { required, minLength: minLength(3) },
    email: { required, email },
    phone: { required }
  },
  mounted () {
    this.$store.dispatch('auth/user')
      .then(response => {
        this.name = response.data.name
        this.email = response.data.email
        this.phone = response.data.phone
        this.loading = false
      })
      .catch(error => {
        throw error
      })
  },
  methods: {
    handleSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.loading = true
      this.$store.dispatch('auth/editAccount', {
        name: this.name,
        email: this.email,
        phone: this.phone
      }).then(response => {
        this.loading = false
        this.$message('Ваша учетная запись успешно изменена!')
      }).catch(error => {
        this.$error(error.response.data.message)
        throw error
      })
    }
  }
}
</script>

<style scoped>

</style>
