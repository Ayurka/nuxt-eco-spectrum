<template>
  <div class="uk-section uk-padding-remove-top" uk-height-viewport="expand: true">
    <div style="background-color:#eff3f7;">
      <div class="uk-container uk-container-large uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
        <ul class="uk-breadcrumb uk-margin-small-top uk-margin-small-bottom">
          <nuxt-link tag="li" :to="{ name: 'index' }"><a>Главная</a></nuxt-link>
          <li>
            <a @click.prevent>Каталог</a>
          </li>
        </ul>
        <search-product />
      </div>
    </div>
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-bullet h1-title uk-margin-medium-bottom">Каталог</h1>
      <div class="uk-grid uk-grid-column-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-5@l uk-margin-small-top">
        <category-list
          v-for="category in getCategories"
          :key="category.id"
          :category="category"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import categoryList from "~/components/catalog/categoryList";
import searchProduct from "~/components/catalog/searchProduct";

export default {
  name: 'index',
  components: {
    categoryList, searchProduct
  },
  computed: {
    ...mapGetters('category', [
      'getCategories'
    ])
  },
  async fetch ({ store, error }) {
    try {
      await store.dispatch('category/fetchCategories');
    } catch (e) {
      error({ statusCode: 505 });
    }
  },
  head: {
    title: 'Каталог'
  }
}
</script>

<style scoped>
  .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before {
    margin: 0 10px;
  }
</style>
