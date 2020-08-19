<template>
  <ul class="uk-breadcrumb uk-margin-small-top uk-margin-small-bottom">
    <nuxt-link tag="li" :to="{ name: 'index' }"><a>Главная</a></nuxt-link>
    <nuxt-link tag="li" :to="{ name: 'catalog' }"><a>Каталог</a></nuxt-link>
    <nuxt-link
      v-for="(item, index) in path"
      :key="index"
      tag="li"
      :to="'/catalog/' + item.url"
    >
      <a>{{ item.title }}</a>
    </nuxt-link>
    <template v-if="current.breadcrumbs.title">
      <nuxt-link tag="li" :to="'/catalog/' + current.breadcrumbs.url"><a>{{ current.breadcrumbs.title }}</a></nuxt-link>
    </template>
    <li>
      <a @click.prevent>{{ current.title }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "breadcrumbs",
  props: {
    path: {
      type: Array,
      required: true
    },
    current: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before {
    margin: 0 10px;
  }
</style>
