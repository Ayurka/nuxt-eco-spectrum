export const state = () => ({
  categories: null,
  category: null,
})

export const actions = {
  async fetchCategories ({ commit }) {
    try {
      const { data } = await this.$axios.$get('/categories');
      commit('setCategories', data);
    } catch (e) {
      throw e;
    }
  },
  async fetchCategory ({ commit }, slug) {
    try {
      const { data } = await this.$axios.$get(`/category/${slug}`);
      commit('setCategory', data);
    } catch (e) {
      throw e;
    }
  }
}

export const mutations = {
  setCategories (state, data) {
    state.categories = data
  },
  setCategory (state, data) {
    state.category = data
  }
}

export const getters = {
  getCategories: state => state.categories,
  getCategory: state => state.category
}
