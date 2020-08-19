<template>
  <div class="uk-float-left">
    <a
      @click.prevent="changeCatalogView('list')"
      uk-icon="menu"
      class="uk-margin-small-right"
      :class="{ 'catalog-view': getCatalogView === 'list' }"
    ></a>
    <a
      @click.prevent="changeCatalogView('grid')"
      uk-icon="grid"
      :class="{ 'catalog-view': getCatalogView === 'grid' }"
    ></a>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "catalogView",
  computed: {
    ...mapGetters('catalog', ['getCatalogView'])
  },
  methods: {
    ...mapMutations('catalog', ['setCatalogView']),
    changeCatalogView (view) {
      this.setCatalogView(view);
    }
  }
}
</script>

<style scoped>

</style>
