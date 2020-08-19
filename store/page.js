export const state = () => ({
  page: null
})

export const actions = {
  async page ({ commit }, slug) {
    try {
      const { data } = await this.$axios.$get(`/page/${slug}`);
      commit('setPage', data);
    } catch (e) {
      throw e;
    }
  }
}

export const mutations = {
  setPage (state, data) {
    state.page = data
  }
}

export const getters = {
  getPage: state => state.page
}
