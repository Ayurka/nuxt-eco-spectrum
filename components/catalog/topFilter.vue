<template>
  <div class="uk-float-right">
    <span class="uk-text-small">Сортировать:</span> <a href="" class="uk-text-small" style="color: #f0506e">{{ topFilterSelected.toLowerCase() }}</a>
    <div uk-dropdown="pos: bottom-right; mode: click;" ref="filterDropdown">
      <div class="uk-margin">
        <div class="uk-form-controls">
          <div v-for="(item, index) in getTopFilters" :key="index">
            <label><input class="uk-radio" type="radio" v-model="topFilterSelected" @change="changeFilterTop" :value="item"> {{ item }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "topFilter",
  computed: {
    ...mapGetters('catalog', ['getTopFilterSelected', 'getTopFilters']),
    topFilterSelected: {
      get () {
        return this.getTopFilterSelected
      },
      set (value) {
        this.$store.commit('catalog/setTopFilterSelected', value);
      }
    }
  },
  methods: {
    ...mapActions('catalog', ['fetchCatalog']),
    async changeFilterTop () {
      try {
        this.$uikit.dropdown(this.$refs.filterDropdown).hide(100);
        await this.fetchCatalog({
          path: this.$route.params.pathMatch,
          page: 1
        });
        this.$emit('changeValue', 1);
        await this.$router.push({
          path: this.$route.fullPath,
          query: { page: 1 }
        });
      } catch (e) {
        throw e;
      }
    }
  },
  destroyed () {
    this.$store.commit('catalog/setTopFilterSelected');
  }
}
</script>

<style scoped>
  .uk-radio:checked {
    background-color: #f0506e;
  }
</style>
