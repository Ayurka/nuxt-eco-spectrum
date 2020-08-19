export const state = () => ({
  orders: [],
  order: {}
})

export const actions = {
  async orderStoreGuest ({}, data) {
    try {
      await this.$axios.$post('/auth/order/store-guest', data);
    } catch (e) {
      throw e;
    }
  },
  async orderStoreAuth ({}, data) {
    try {
      await this.$axios.$post('/auth/order/store-auth', data);
    } catch (e) {
      throw e;
    }
  },
  async orders ({ commit }) {
    try {
      const { data } = await this.$axios.$get('/auth/orders');
      commit('set_orders', data);
    } catch (e) {
      throw e;
    }
  },
  async order ({ commit }, id) {
    try {
      const { data } = await this.$axios.$get(`/auth/order/${id}`);
      commit('set_order', data);
    } catch (e) {
      throw e;
    }
  }
}

export const mutations = {
  set_orders (state, data) {
    state.orders = data;
  },
  set_order (state, data) {
    state.order = data;
  }
}

export const getters = {
  getOrders: state => state.orders,
  getOrder: state => state.order
}
