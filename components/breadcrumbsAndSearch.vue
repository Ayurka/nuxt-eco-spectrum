<template>
  <div style="background-color:#eff3f7;">
    <div class="uk-container uk-container-large uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
      <breadcrumbs :path="model.breadcrumbs" :current="model" />
      <search-product />
    </div>
  </div>
</template>

<script>
import breadcrumbs from "~/components/breadcrumbs";
import searchProduct from "~/components/catalog/searchProduct";

export default {
  name: "breadcrumbsAndSearch",
  components: {
    breadcrumbs, searchProduct
  },
  props: {
    model: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
