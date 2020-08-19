<template>
  <ul class="uk-navbar-nav">
    <nuxt-link
      v-for="(link, index) of links"
      :key="index"
      tag="li"
      active-class="uk-active"
      :to="{ name: link.url }"
      :exact="link.exact"
    >
      <a class="menu-a">{{ link.title }}</a>
    </nuxt-link>
  </ul>
</template>

<script>
export default {
  name: 'mainMenu',
  data: () => ({
    links: [
      { title: 'Главная', url: 'index', exact: true },
      { title: 'Услуги', url: 'service' },
      { title: 'Каталог', url: 'catalog' },
      { title: 'Оплата', url: 'payment' },
      { title: 'Доставка', url: 'delivery' },
      { title: 'О компании', url: 'about' }
    ]
  })
}
</script>

<style scoped>

</style>
