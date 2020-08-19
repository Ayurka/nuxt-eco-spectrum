export const state = () => ({
  category: null,
  product: null,
  type: null,
  rangePrice: [],
  leftFilterChecked: null,
  topFilterSelected: 'По возрастанию цены',
  topFilters: [
    'По возрастанию цены',
    'По убыванию цены',
    'По наименованию'
  ],
  catalogView: 'list',
  searchProducts: []
})

export const actions = {
  async fetchCatalog ({ state, commit }, params) {
    try {
      const { data } = await this.$axios.$get(`/catalog/${params.path}`, {
        params: {
          filter: state.leftFilterChecked,
          sort: state.topFilterSelected,
          range: state.rangePrice,
          page: params.page
        }
      });
      if (data.type === 'category') {
        commit('setCategory', data);
        commit('setType', data.type);
      } else {
        commit('setProduct', data);
        commit('setType', data.type);
      }
    } catch (e) {
      throw e;
    }
  },
  async searchProducts ({ commit }, query) {
    try {
      const { data } = await this.$axios.$get(`/search/`, {
        params: { query }
      });
      commit('setSearchProducts', data);
    } catch (e) {
      throw e;
    }
  }
}

export const mutations = {
  setCategory (state, data) {
    return state.category = data;
  },
  setProduct (state, data) {
    return state.product = data;
  },
  setType (state, data) {
    return state.type = data
  },
  setRangePrice (state, value) {
    return state.rangePrice = [ ...value ];
  },
  setLeftFilterChecked (state, value) {
    return state.leftFilterChecked = { ...value };
  },
  clearLeftFilterChecked (state) {
    return state.leftFilterChecked = null;
  },
  setTopFilterSelected (state, value = 'По возрастанию цены') {
    return state.topFilterSelected = value;
  },
  setCatalogView (state, value) {
    return state.catalogView = value;
  },
  setSearchProducts (state, data) {
    return state.searchProducts = data
  },
  clearSearchProducts (state) {
    return state.searchProducts = []
  }
}

export const getters = {
  getCategory: state => state.category,
  getProduct: state => state.product,
  getType: state => state.type,
  getTopFilterSelected: state => state.topFilterSelected,
  getTopFilters: state => state.topFilters,
  getCatalogView: state => state.catalogView,
  getTotalPages: state => state.category.products.pagination.total_pages,
  getSearchProducts: state => state.searchProducts
}
