<template>
  <div class="uk-section uk-padding-remove-top" uk-height-viewport="expand: true">
    <div style="background-color:#eff3f7;">
      <div class="uk-container uk-container-large uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
        <ul class="uk-breadcrumb uk-margin-small-top uk-margin-small-bottom">
          <nuxt-link tag="li" :to="{ name: 'index' }"><a>Главная</a></nuxt-link>
          <nuxt-link tag="li" :to="{ name: 'catalog' }"><a>Каталог</a></nuxt-link>
          <li>
            <a @click.prevent>Поиск</a>
          </li>
        </ul>
        <search-product />
      </div>
    </div>
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-bullet h1-title uk-margin-medium-bottom">Найдено {{ getSearchProducts.length }} {{ getSearchProducts.length | declension(['товар','товара','товаров']) }}</h1>
      <template v-if="getSearchProducts.length > 0">
        <div class="uk-card uk-card-default uk-margin-small-bottom uk-padding-small">
          <catalog-view />
          <div class="uk-clearfix"></div>
        </div>
        <template v-if="getCatalogView === 'grid'">
          <div class="uk-grid uk-grid-column-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l">
            <product-grid
              v-for="item in getSearchProducts"
              :key="item.id"
              :product="item"
            />
          </div>
        </template>
        <template v-else>
          <div class="uk-grid-row-small uk-child-width-1-1" uk-grid>
            <product-list
              v-for="item in getSearchProducts"
              :key="item.id"
              :product="item"
            />
          </div>
        </template>
      </template>
      <template v-else>
        <div class="uk-card uk-card-default">
          <div class="uk-margin-auto uk-text-center uk-width-1-1@s uk-width-1-2@m uk-width-1-3@l">
            <img data-src="/no-search-results.png" width="350" alt="" uk-img>
            <div class="uk-text-large uk-text-bold">Странно, но ничего нет</div>
            <div class="padding-bottom">К сожалению, по вашему запросу ничего не найдено. Проверьте правильность ввода или попробуйте изменить запрос.</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import breadcrumbsAndSearch from "@/components/breadcrumbsAndSearch";
import searchProduct from "@/components/catalog/searchProduct";
import productList from "@/components/catalog/productList";
import productGrid from "@/components/catalog/productGrid";
import catalogView from "@/components/catalog/catalogView";

export default {
  name: "search",
  components: {
    breadcrumbsAndSearch,
    searchProduct,
    productList,
    productGrid,
    catalogView
  },
  async fetch ({ store, route }) {
    try {
      await store.dispatch('catalog/searchProducts', route.query.q);
    } catch (e) {
      throw e;
    }
  },
  computed: {
    ...mapGetters('catalog', ['getSearchProducts', 'getCatalogView'])
  },
  methods: {
    ...mapMutations('catalog', ['clearSearchProducts', 'setCatalogView']),
    changeCatalogView (view) {
      this.setCatalogView(view);
    }
  },
  destroyed() {
    this.clearSearchProducts()
  },
  head: {
    title: 'Поиск по каталогу'
  }
}
</script>

<style lang="scss">
  .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before {
    margin: 0 10px;
  }
  .catalog-view[uk-icon="menu"] svg rect {
    fill: #e2101e;
  }
  .catalog-view[uk-icon="grid"] svg rect {
    fill: #e2101e;
  }
  .padding-bottom {
    padding-bottom: 40px;
  }
</style>
