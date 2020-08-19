<template>
  <div class="uk-section uk-padding-remove-top" uk-height-viewport="expand: true">
    <template v-if="getType === 'category'">
      <category-show :category="getCategory" />
    </template>
    <template v-else>
      <product-show :product="getProduct" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import categoryShow from "~/components/catalog/categoryShow";
import productShow from "~/components/catalog/productShow";
import breadcrumbs from "~/components/breadcrumbs";

export default {
  name: "_",
  components: {
    categoryShow, productShow, breadcrumbs
  },
  async validate({ $axios, params, store }) {
    try {
      store.commit('catalog/setRangePrice', []);
      store.commit('catalog/clearLeftFilterChecked');
      const data = await $axios.$get(`/isUrl/${params.pathMatch}`);
      if (data.success) {
        return true;
      }
    } catch (e) {
      throw e;
    }
  },
  async fetch ({ store, params, route }) {
    try {
      await store.dispatch('catalog/fetchCatalog', {
        path: params.pathMatch,
        page: route.query.page
      });
    } catch (e) {
      throw e;
    }
  },
  computed: {
    ...mapGetters('catalog', [
      'getCategory', 'getProduct', 'getType'
    ])
  },
  head: {
    title: 'this.getCategory.title',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'my website description'
      }
    ],
  }
}
</script>

<style scoped>

</style>
