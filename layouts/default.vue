<template>
  <div>
    <nav-bar/>
    <nuxt/>
    <main-footer/>
    <offCanvas/>
    <span class="to-top">
      <a href="#" uk-totop uk-scroll></a>
    </span>
    <button-cart/>
  </div>
</template>

<script>
import navBar from "~/components/navBar";
import offCanvas from "~/components/offCanvas";
import mainFooter from "~/components/mainFooter";
import buttonCart from "~/components/buttonCart";

export default {
  components: {
    navBar, offCanvas, mainFooter, buttonCart
  }
}

</script>

<style>

</style>

