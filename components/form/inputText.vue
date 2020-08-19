<template>
  <div>
    <label class="uk-form-label">{{ label }}</label>
    <div class="uk-form-controls">
      <input
        class="uk-input"
        type="text"
        v-model.trim="name"
        :class="{
          'uk-form-danger':
          (v.$params.required ? (v.$dirty && !v.required) : '') ||
          (v.$params.minLength ? (v.$dirty && !v.minLength) : '')
        }"
      >
      <div v-if="v.$params.required">
        <span
          v-if="v.$dirty && !v.required"
          class="uk-text-danger uk-text-small"
        >Поле "{{ label }}" обязательно к заполнению</span>
      </div>
      <div v-if="v.$params.minLength">
        <span
          class="uk-text-danger uk-text-small"
          v-if="v.$dirty && !v.minLength"
        >Количество символов должен быть не менее {{ v.$params.minLength.min }} символов. Сейчас {{ name.length }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inputText',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    v: {
      type: Object,
      required: true
    }
  },
  computed: {
    name: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>

</style>
