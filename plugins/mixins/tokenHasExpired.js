export default {
  async created () {
    try {
      await this.$auth.fetchUser();
    } catch (e) {
      if (e.response.status === 401) {
        this.$auth.reset();
        this.$router.push({ name: 'login' });
      }
    }
  },
}
