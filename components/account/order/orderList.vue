<template>
  <tr>
    <td>№ {{ order.id }}</td>
    <td>{{ order.total | currency }}</td>
    <td>{{ order.quantity }} шт.</td>
    <td>{{ order.status }}</td>
    <td>{{ order.created_at | date }}</td>
    <td>
      <nuxt-link
        :to="{ name: 'account-order-id', params: { id: order.id } }"
        class="uk-button uk-button-primary uk-border-rounded"
      >
        Подробнее
      </nuxt-link>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'orderList',
  props: {
    order: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
