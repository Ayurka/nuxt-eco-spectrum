<template>
  <div id="offcanvas-overlay" uk-offcanvas="overlay: true">
    <div class="uk-offcanvas-bar">

      <button class="uk-offcanvas-close" type="button" uk-close></button>

      <ul class="uk-nav uk-nav-default tm-nav">
        <li class="uk-nav-header">Меню</li>
        <li class="uk-nav-divider"></li>
        <router-link
          v-for="(link, index) of links"
          :key="index"
          tag="li"
          :to="{ name: link.url }"
          active-class="uk-active"
          :exact="link.exact"
        ><a>{{ link.title }}</a></router-link>
      </ul>
      <ul v-if="!$auth.loggedIn" class="uk-nav uk-nav-default tm-nav uk-margin-top">
        <li class="uk-nav-header">Личный кабинет</li>
        <li class="uk-nav-divider"></li>
        <router-link tag="li" :to="{ name: 'login' }" active-class="uk-active"><a>Войти</a></router-link>
        <router-link tag="li" :to="{ name: 'register' }" active-class="uk-active"><a>Регистрация</a></router-link>
      </ul>
      <ul v-else class="uk-nav uk-nav-default tm-nav uk-margin-top">
        <li class="uk-nav-header">Личный кабинет</li>
        <li class="uk-nav-divider"></li>
        <nuxt-link
          v-for="(link, index) in account"
          :key="index"
          tag="li"
          :to="{ name: link.url }"
          active-class="uk-active"
          :exact="link.exact"
          class="uk-text-secondary"
        ><a><span :uk-icon="link.icon"></span> {{ link.title }}</a></nuxt-link>
        <li><a @click="logout"><span uk-icon="sign-out"></span> Выход</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'offCanvas',
  data: () => ({
    links: [
      { title: 'Главная', url: 'index', exact: true },
      { title: 'Услуги', url: 'service' },
      { title: 'Каталог', url: 'catalog' },
      { title: 'Оплата', url: 'payment' },
      { title: 'Доставка', url: 'delivery' },
      { title: 'О компании', url: 'about' }
    ],
    account: [
      { title: 'Профиль', url: 'account', icon: 'user', exact: true },
      { title: 'Изменить пароль', url: 'account-password', icon: 'lock' },
      { title: 'Реквизиты', url: 'account-company', icon: 'file-text' },
      { title: 'Заказы', url: 'account-order', icon: 'cart' }
    ]
  }),
  methods: {
    logout () {
      this.$auth.logout();
      this.$router.push({ name: login });
    }
  }
}
</script>

<style scoped>

</style>
