<template>
  <div class="uk-form-controls">
    <label class="uk-form-label">{{ label }}</label>
    <select class="uk-select" v-model="name">
      <option
        v-for="item of list"
        :key="item.id"
        :value="item.name"
        :selected="item.selected"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'select',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
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
