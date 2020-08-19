<template>
  <div class="uk-width-1-4@m">
    <div class="uk-card uk-card-default uk-card-body">
      <div class="uk-margin">
        <div class="uk-form-label form-label">Цена</div>
        <div class="padding-left-right">
          <client-only>
            <vue-slider
              v-model="rangePrice"
              :enable-cross="false"
              :min="minMax[0]"
              :max="minMax[1]"
              :tooltip="'none'"
              :process="processGreen"
            />
          </client-only>
        </div>
        <div class="uk-flex uk-flex-between">
          <div>{{ rangePrice[0] | currency }}</div>
          <div>{{ rangePrice[1] | currency }}</div>
        </div>
      </div>
      <div
        v-for="group in filters"
        :key="group.id"
        class="uk-margin"
      >
        <div class="uk-form-label form-label">{{ group.title }}</div>
        <div class="uk-form-controls uk-form-controls-text">
          <label
            v-for="filter in group.filters"
            :key="filter.id"
          >
            <input
              v-model="leftFilterChecked[group.title]"
              :value="filter.id"
              class="uk-checkbox"
              type="checkbox"> <span class="filter-title">{{ filter.title }}</span><br>
          </label>
        </div>
      </div>
      <button @click="applyFilter" class="uk-button uk-button-danger uk-border-rounded uk-width-1-1 uk-margin-small-bottom">Применить</button>
      <button @click="resetFilter" class="uk-button uk-button-default uk-border-rounded uk-width-1-1">Сбросить</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

export default {
  name: "leftFilter",
  components: {
    VueSlider
  },
  props: {
    filters: {
      type: Array,
      required: true
    },
    minMax: {
      type: Array,
      required: true
    }
  },
  data () {
    const leftFilters = {};
    this.filters.forEach (item => {
      leftFilters[item.title] = [];
    });
    return {
      leftFilterChecked: leftFilters,
      rangePrice: this.minMax,
      processGreen: dotsPos => [
        [dotsPos[0], dotsPos[1], { backgroundColor: '#f0506e' }]
      ],
    }
  },
  methods: {
    ...mapActions('catalog', ['fetchCatalog']),
    async applyFilter () {
      try {
        this.$store.commit('catalog/setRangePrice', this.rangePrice);
        this.$store.commit('catalog/setLeftFilterChecked', this.leftFilterChecked);
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
    },
    async resetFilter () {
      try {
        const leftFilters = {};
        this.filters.forEach (item => {
          leftFilters[item.title] = [];
        });
        this.leftFilterChecked = leftFilters;
        this.rangePrice = this.minMax;
        this.$store.commit('catalog/setRangePrice', []);
        this.$store.commit('catalog/setLeftFilterChecked', leftFilters);
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
  }
}
</script>

<style lang="scss" scoped>
  .padding-left-right {
    padding-left: 7px;
    padding-right: 7px;
  }
  .form-label {
    font-size: 19px;
  }
  .uk-checkbox:checked {
    background-color: #f0506e;
  }
  .uk-checkbox:focus, .uk-radio:focus {
    outline: 0;
    border-color: #f0506e;
  }
  .filter-title {
    font-size: 16px;
  }
</style>
