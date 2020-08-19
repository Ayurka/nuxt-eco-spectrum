<template>
  <div style="background-color: #4D4C5E;">
    <div class="uk-container uk-container-large">
      <nav uk-navbar>
        <div class="uk-navbar-left uk-margin-small-top uk-margin-small-bottom">
          <logo/>
        </div>
        <div class="uk-navbar-center uk-visible@l">
          <main-menu/>
        </div>
        <div class="uk-navbar-right">
          <account/>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import logo from './navbar/logo';
import mainMenu from './navbar/mainMenu';
import account from './navbar/account';

export default {
  name: "navBar",
  components: {
    logo, mainMenu, account
  }
}
</script>

<style scoped>

</style>
