<template>
  <div class="uk-margin">
    <div class="uk-form-label form-label">Цена</div>
    <div id="my-slider"  :se-min="minThreshold" :se-step="step" :se-min-value="min" :se-max-value="max" :se-max="maxThreshold">
      <div class="slider-touch-left">
        <span></span>
      </div>
      <div class="slider-touch-right">
        <span></span>
      </div>
      <div class="slider-line">
        <span></span>
      </div>
    </div>
    <div class="uk-flex uk-flex-between">
      <div class="textRangeSlider">{{ min | currency }}</div>
      <div class="textRangeSlider">{{ max | currency }}</div>
    </div>
  </div>
</template>

<script>
import ZbRangeSlider from '~/plugins/rangeSlider';

export default {
  name: "rangePrice",
  props: {
    minThreshold: {
      type: Number,
      required: true
    },
    maxThreshold: {
      type: Number,
      required: true
    },
    step: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      instance: undefined
    }
  },
  mounted: function () {
    this.instance = new ZbRangeSlider('my-slider')
    this.instance.onChange = (min, max) => this.updateValues(min, max)
  },
  destroyed: function () {

  },
  methods: {
    updateValues: function (min, max) {
      this.$emit('update:min', min)
      this.$emit('update:max', max)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-label {
    font-size: 19px;
  }
  .textRangeSlider {
    font-size: 16px;
  }
  #my-slider {
    display: block;
    position: relative;
    height: 36px;
    width: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;

    .slider-touch-left, .slider-touch-right {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      display: block;
      position: absolute;
      height: 36px;
      width: 36px;
      padding: 6px;
      z-index: 2;
    }
    .slider-touch-left span, .slider-touch-right span {
      display: block;
      width: 100%;
      height: 100%;
      background: #f0f0f0;
      border: 1px solid #a4a4a4;
      border-radius: 50%;
    }
    .slider-line {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      position: absolute;
      width: calc(100% - 36px);
      left: 18px;
      top: 16px;
      height: 4px;
      border-radius: 4px;
      background: #f0f0f0;
      z-index: 0;
      overflow: hidden;
    }
    .slider-line span {
      display: block;
      height: 100%;
      width: 0;
      background: #9EEA6A;
    }
  }
</style>
