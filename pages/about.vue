<template>
  <div class="uk-section uk-padding-remove-top" uk-height-viewport="expand: true">
    <div style="background-color:#eff3f7;">
      <div class="uk-container uk-container-large uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
        <ul class="uk-breadcrumb uk-margin-small-top uk-margin-small-bottom">
          <nuxt-link tag="li" :to="{ name: 'index' }"><a>Главная</a></nuxt-link>
          <li>
            <a @click.prevent>{{ getPage.title }}</a>
          </li>
        </ul>
        <search-product />
      </div>
    </div>
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-bullet h1-title uk-margin-medium-bottom">О компании</h1>
      <div v-html="getPage.description" class="uk-card uk-card-default uk-card-body"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import searchProduct from "~/components/catalog/searchProduct";

export default {
  name: "about",
  components: {
    searchProduct
  },
  async fetch ({ store, error }) {
    try {
      await store.dispatch('page/page', 'about');
    } catch (e) {
      error({ statusCode: 505 });
    }
  },
  computed: {
    ...mapGetters('page', [
      'getPage'
    ]),
  },
  head () {
    return {
      title: this.getPage.seo_title ? this.getPage.seo_title : this.getPage.title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.getPage.seo_keywords
        },
        {
          hid: 'description',
          name: 'description',
          content: this.getPage.seo_description
        }
      ],
    }
  }
}
</script>

<style scoped>
  .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before {
    margin: 0 10px;
  }
</style>
