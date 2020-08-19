<template>
  <div>
    <HomeBlock/>
    <Service/>
    <Scheme/>
    <About/>
  </div>
</template>

<script>
import HomeBlock from '~/components/home/HomeBlock'
import Service from '~/components/home/Service'
import Scheme from '~/components/home/Scheme'
import About from '~/components/home/About'

export default {
  components: {
    HomeBlock, Service, Scheme, About
  }
}
</script>

<style>

</style>

