export const state = () => ({})

export const actions = {
  async editAccount ({ commit }, user) {
    try {
      const { data } = await this.$axios.$post('/auth/edit/account', user);
      this.$auth.setUser(data);
    } catch (e) {
      throw e;
    }
  },
  async editPassword ({ commit, rootGetters }, password) {
    try {
      await this.$axios.$post('/auth/edit/password', password);
    } catch (e) {
      throw e;
    }
  },
  async editCompany ({ commit, rootGetters }, company) {
    try {
      const { data } = await this.$axios.$post('/auth/edit/company', company);
      this.$auth.setUser(data);
    } catch (e) {
      throw e;
    }
  },
  async getCompanyByInn ({ commit, rootGetters }, params) {
    try {
      const data = await this.$axios.$get('/auth/getCompanyByInn/', {
        params: {
          type: params.type,
          inn: params.inn
        }
      });
      return data.company.data;
    } catch (e) {
      throw e;
    }
  }
}

export const mutations = {}

export const getters = {}
