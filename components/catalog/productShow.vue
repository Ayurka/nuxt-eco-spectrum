<template>
  <div>
    <breadcrumbs-and-search :model="product" />
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-bullet h1-title uk-margin-medium-bottom">{{ product.title }}</h1>
      <div class="uk-card uk-card-default uk-card-body">
        <div class="uk-grid-divider uk-child-width-expand@s" uk-grid>
          <div v-if="product.images.length">
            <div uk-lightbox>
              <a :href="product.images[currentImage].large">
                <img :data-src="product.images[currentImage].large" alt="" uk-img>
              </a>
            </div>
            <div class="uk-margin-small-top uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slider>
              <ul class="uk-slider-items uk-child-width-1-4 uk-grid">
                <li
                  v-for="(image, index) of product.images"
                  :key="index"
                  @click="selectImage(index)"
                ><img :src="image.small" alt=""></li>
              </ul>
              <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
              <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>
            </div>
          </div>
          <div v-else><img data-src="/no-image.png" alt="" uk-img></div>
          <div>
            <div class="uk-text-large uk-text-bolder uk-text-secondary">Цена: {{ product.price | currency }}</div>
            <template v-if="product.attributes.length">
              <hr>
              <div>
                <div class="uk-text-large uk-text-bolder uk-text-secondary uk-margin-small-bottom">Состав:</div>
                <div
                  v-for="attribute of product.attributes"
                  :key="attribute.id"
                  class="uk-grid-small"
                  uk-grid
                >
                  <div class="uk-width-expand" uk-leader="media: @m">{{ attribute.title }}</div>
                  <div>{{ attribute.pivot.text }}</div>
                </div>
              </div>
            </template>
            <hr>
            <div class="uk-margin">
              <label class="uk-form-label uk-text-large uk-text-bolder uk-text-secondary">Количество:</label>
              <div class="uk-form-controls">
                <input
                  type="number"
                  class="uk-input uk-form-width-small uk-width-1-1"
                  v-model="quantity"
                  min="1"
                >
              </div>
            </div>
            <div class="uk-margin">
              <button class="uk-button uk-button-danger uk-border-rounded uk-width-1-1" @click="addItemToCart">Заказать</button>
            </div>
            <hr>
            <div class="uk-text-large uk-text-bolder uk-text-secondary uk-margin-small-bottom">Описание:</div>
            <div v-html="product.description"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import breadcrumbsAndSearch from "~/components/breadcrumbsAndSearch";

export default {
  name: "productShow",
  components: {
    breadcrumbsAndSearch
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    currentImage: 0,
    quantity: 1
  }),
  computed: {
    ...mapGetters('cart',[
      'quantityAll'
    ])
  },
  methods: {
    ...mapMutations('cart', {
      addToCart: 'setCart'
    }),
    selectImage (index) {
      this.currentImage = index
    },
    addItemToCart () {
      this.addToCart({ ...this.product, quantity: this.quantity });
      this.quantity = 1;
      this.$message(`Товар ${this.product.title} добавлен в корзину`);
    }
  },
  head () {
    return {
      title: this.product.seo_title ? this.product.seo_title : this.product.title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.product.seo_keywords
        },
        {
          hid: 'description',
          name: 'description',
          content: this.product.seo_description
        }
      ],
    }
  }
}
</script>

<style scoped>

</style>
