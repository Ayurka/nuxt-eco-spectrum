<template>
  <ul class="uk-pagination uk-flex-center uk-margin-large-top">
    <li :class="{ 'uk-disabled': value === 1 }"><a @click.prevent="decrement(value)"><span uk-pagination-previous></span></a></li>
    <li
      v-for="item in total"
      :key="item"
      :class="{ 'uk-active': item === value }"
    >
      <a v-if="item !== value" @click.prevent="handleClick(item)">{{ item }}</a>
      <span v-else>{{ item }}</span>
    </li>
    <li :class="{ 'uk-disabled': total === value }"><a @click.prevent="increment(value)"><span uk-pagination-next></span></a></li>
  </ul>
</template>

<script>
export default {
  name: "pagination",
  props: {
    value: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    increment (value) {
      let increment = value + 1;
      this.handleClick(increment);
    },
    decrement (value) {
      let decrement = value - 1;
      this.handleClick(decrement);
    },
    handleClick (value) {
      this.$store.dispatch('catalog/fetchCatalog', {
        path: this.$route.params.pathMatch,
        page: value
      }).then(() => {
        this.$emit('changeValue', value);
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        this.$router.push({ path: this.$route.fullPath, query: { page: value } });
      })
    }
  }
}
</script>

<style scoped>

</style>
