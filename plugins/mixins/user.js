import Vue from 'vue';
import { mapState } from 'vuex';

const User = {
  install(Vue, options) {
    Vue.mixin({
      computed: {
        ...mapState('auth', {
          isLoggedIn: 'loggedIn',
          user: 'user'
        })
      }
    })
  }
}

Vue.use(User);
