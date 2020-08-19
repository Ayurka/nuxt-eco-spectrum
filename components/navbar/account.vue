<template>
  <div>
    <div class="uk-visible@l" v-if="!$auth.loggedIn">
      <nuxt-link tag="button" :to="{ name: 'register' }" class="uk-button uk-button-green uk-margin-small-right uk-text-secondary uk-border-rounded">Регистрация</nuxt-link>
      <nuxt-link tag="button" :to="{ name: 'login' }" class="uk-button uk-text-secondary uk-margin-small-right uk-border-rounded"><span uk-icon="sign-in"></span> Вход</nuxt-link>
    </div>
    <div class="uk-visible@l" v-else>
      <button class="uk-button uk-text-secondary uk-border-rounded" type="button">{{ $auth.user.name }} <span uk-icon="chevron-down"></span></button>
      <client-only>
        <div uk-dropdown="mode: click" class="uk-border-rounded" ref="ukDropdown">
          <ul class="uk-nav uk-dropdown-nav">
            <li><nuxt-link :to="{ name: 'account' }" @click.native="closeDropdown" class="uk-text-secondary"><span uk-icon="user"></span> Профиль</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'account-password' }" @click.native="closeDropdown" class="uk-text-secondary"><span uk-icon="lock"></span> Изменить пароль</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'account-company' }" @click.native="closeDropdown" class="uk-text-secondary"><span uk-icon="file-text"></span> Реквизиты</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'account-order' }" @click.native="closeDropdown" class="uk-text-secondary"><span uk-icon="cart"></span> Заказы</nuxt-link></li>
            <li><a @click="logout" class="uk-text-secondary"><span uk-icon="sign-out"></span> Выход</a></li>
          </ul>
        </div>
      </client-only>
    </div>
    <a class="uk-navbar-toggle uk-hidden@l" uk-navbar-toggle-icon href="" uk-toggle="target: #offcanvas-overlay"></a>
  </div>
</template>

<script>
export default {
  name: 'account',
  methods: {
    async logout () {
      await this.$auth.logout();
      this.$router.push({ name: 'login' });
    },
    closeDropdown () {
      this.$uikit.dropdown(this.$refs.ukDropdown).hide(100);
    }
  }
}
</script>

<style scoped>
  [class*=uk-dropdown-bottom]{
    margin-top: 5px;
    background-color: #ffffff;
    box-shadow: 0 5px 12px rgba(0,0,0,0.15);
  }
</style>
