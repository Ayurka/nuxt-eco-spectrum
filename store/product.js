export const state = () => ({
  products: null,
  product: null,
})

export const actions = {
  async fetchProducts ({ commit }) {
    try {
      const { data } = await this.$axios.$get('/products');
      commit('setProducts', data);
    } catch (e) {
      throw e;
    }
  },
  async fetchProduct ({ commit }, slug) {
    try {
      const { data } = await this.$axios.$get(`/product/${slug}`);
      commit('setProduct', data);
    } catch (e) {
      throw e;
    }
  }
}

export const mutations = {
  setProducts (state, data) {
    state.products = data
  },
  setProduct (state, data) {
    state.product = data
  }
}

export const getters = {
  getProducts: state => state.products,
  getProduct: state => state.product
}
