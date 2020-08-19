export const state = () => ({
  error: null,
  urlApi: 'http://localhost/api',
})

export const mutations = {
  setError (state, error) {
    state.error = error
  },
  clearError (state) {
    state.error = null
  }
}

export const actions = {}

export const getters = {
  getUrlApi: state => state.urlApi,
}
