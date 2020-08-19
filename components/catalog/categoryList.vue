<template>
  <div class="margin-bottom">
    <div class="uk-card uk-card-default link" @click="link">
      <div class="uk-card-media-top">
        <img v-if="category.images.length" :data-src="category.images[0].large" alt="" uk-img>
        <img v-else data-src="/no-image.png" alt="" uk-img>
      </div>
      <div class="uk-card-body">
        <h3 class="uk-card-title uk-text-center text-size">{{ category.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "categoryList",
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  methods: {
    link () {
      this.$router.push({ path: '/catalog/' + this.category.url })
    }
  }
}
</script>

<style lang="scss" scoped>
  .link {
    cursor: pointer;
  }
  .margin-bottom {
    margin-bottom: 15px;
  }
  .text-size {
    font-size: 19px;
  }
  @media (min-width: 1200px) {
    .uk-card-body {
      padding: 30px 30px;
    }
  }
</style>
