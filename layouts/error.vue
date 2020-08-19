<template>
  <div class="uk-flex uk-flex-center uk-flex-middle" uk-height-viewport="expand: true">
      <div class="">
        <h1 class=""></h1>
        <h1 v-if="error.statusCode === 404" class="uk-text-large">404 Страница не найдена</h1>
        <h1 v-else class="uk-text-large"><span uk-icon="icon: warning; ratio: 2"></span> Произошла ошибка!</h1>
      </div>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'blog' // you can set a custom layout for the error page
  }
</script>
