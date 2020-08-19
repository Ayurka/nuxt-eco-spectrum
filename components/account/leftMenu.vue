<template>
  <div class="uk-width-1-4@m">
    <div class="uk-card uk-card-default uk-card-body">
      <ul class="uk-list uk-list-divider">
        <li><router-link :to="{ name: 'account' }" class="uk-text-secondary"><span uk-icon="user"></span> Профиль</router-link></li>
        <li><router-link :to="{ name: 'account-password' }" class="uk-text-secondary"><span uk-icon="lock"></span> Изменить пароль</router-link></li>
        <li><router-link :to="{ name: 'account-company' }" class="uk-text-secondary"><span uk-icon="file-text"></span> Реквизиты</router-link></li>
        <li><router-link :to="{ name: 'account-order' }" class="uk-text-secondary"><span uk-icon="cart"></span> Заказы</router-link></li>
        <li><a @click="logout" class="uk-text-secondary"><span uk-icon="sign-out"></span> Выход</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "leftMenu",
  methods: {
    async logout () {
      await this.$auth.logout();
      this.$router.push({ name: 'login' });
    }
  }
}
</script>

<style scoped>

</style>
