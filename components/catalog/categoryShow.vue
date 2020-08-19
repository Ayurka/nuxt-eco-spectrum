<template>
  <div>
    <breadcrumbs-and-search :model="category" />
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-bullet h1-title uk-margin-medium-bottom">{{ category.title }}</h1>
      <div uk-grid>
        <left-filter
          :filters="category.filterGroups"
          :minMax="category.minMax"
          @changeValue="page => meta.current_page = page"
        />
        <div class="uk-width-expand@m">
          <div v-if="category.categories.length" class="uk-grid uk-grid-column-small uk-child-width-1-3@s uk-child-width-1-3@m uk-child-width-1-5@l">
            <category-list
              v-for="item in category.categories"
              :key="item.id"
              :category="item"
            />
          </div>
          <div class="uk-card uk-card-default uk-margin-small-bottom uk-padding-small">
            <catalog-view />
            <top-filter @changeValue="page => meta.current_page = page" />
            <div class="uk-clearfix"></div>
          </div>
          <template v-if="category.products.data.length">
            <template v-if="getCatalogView === 'grid'">
              <div class="uk-grid uk-grid-column-small uk-child-width-1-2@s uk-child-width-1-2@m uk-child-width-1-3@l">
                <product-grid
                  v-for="item in category.products.data"
                  :key="item.id"
                  :product="item"
                />
              </div>
            </template>
            <template v-else>
              <div class="uk-grid-row-small uk-child-width-1-1" uk-grid>
                <product-list
                  v-for="item in category.products.data"
                  :key="item.id"
                  :product="item"
                />
              </div>
            </template>
            <client-only>
              <pagination
                v-model="meta.current_page"
                :total="getTotalPages"
                @changeValue="page => meta.current_page = page"
              />
            </client-only>
          </template>
          <template v-else>
            <div class="uk-card uk-card-default">
              <div class="uk-margin-auto uk-text-center uk-width-1-1@s uk-width-1-2@m uk-width-1-3@l">
                <img data-src="/no-search-results.png" width="350" alt="" uk-img>
                <div class="uk-text-large uk-text-bold">Странно, но ничего нет</div>
                <div class="padding-bottom">Попробуйте изменить критерии поиска</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import breadcrumbsAndSearch from "@/components/breadcrumbsAndSearch";
import categoryList from "@/components/catalog/categoryList";
import productGrid from "@/components/catalog/productGrid";
import productList from "@/components/catalog/productList";
import topFilter from "@/components/catalog/topFilter";
import leftFilter from "@/components/catalog/leftFilter";
import pagination from "@/components/pagination";
import catalogView from "@/components/catalog/catalogView";

export default {
  name: "categoryShow",
  components: {
    breadcrumbsAndSearch,
    categoryList,
    productGrid,
    productList,
    leftFilter,
    topFilter,
    pagination,
    catalogView
  },
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      meta: {
        current_page: 1
      }
    }
  },
  computed: {
    ...mapGetters('catalog', ['getCatalogView', 'getTotalPages'])
  },
  head () {
    return {
      title: this.category.seo_title ? this.category.seo_title : this.category.title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.category.seo_keywords
        },
        {
          hid: 'description',
          name: 'description',
          content: this.category.seo_description
        }
      ],
    }
  }
}
</script>

<style lang="scss">
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
