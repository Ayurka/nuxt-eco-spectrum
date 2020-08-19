<template>
  <div class="uk-margin-small-top uk-margin-small-bottom">
    <client-only>
      <form @submit.prevent class="uk-search uk-search-default">
        <a
          @click.prevent="search"
          class="uk-search-icon-flip uk-search-icon"
          uk-search-icon
        ></a>
        <input
          v-model="query"
          v-on:keyup.prevent.enter="search"
          class="uk-search-input"
          type="search"
          placeholder="Поиск по каталогу...">
      </form>
    </client-only>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "searchProduct",
  data: () => ({
    query: ''
  }),
  methods: {
    ...mapActions('catalog', ['searchProducts']),
    async search () {
      if (this.query) {
        try {
          if (this.$route.path === '/catalog/search') {
            await this.searchProducts(this.query);
            await this.$router.push({ name: 'catalog-search', query: { q: this.query } });
          } else {
            await this.$router.push({ name: 'catalog-search', query: { q: this.query } });
          }
        } catch (e) {
          throw e;
        }
      }
    }
  }
}
</script>

<style scoped>
  .uk-search-default {
    width: 266px;
  }
  .uk-search-default .uk-search-input {
    background-color: #ffffff;
  }
</style>
