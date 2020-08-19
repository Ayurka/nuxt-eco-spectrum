<template>
  <footer>
    <div class="uk-section">
      <div class="uk-container uk-container-large">
        <div uk-grid>
          <div class="uk-width-1-2@m uk-width-1-3@l">
            <ul class="footer-ul">
              <li class="footer-ul__li"><span uk-icon="location"></span> пгт. Агинское, ул. 30 лет Победы, д.11</li>
              <li class="footer-ul__li"><a href="tel:+79144612874" class="footer-ul__li-a"><span uk-icon="receiver"></span> +7(914)461-28-74</a></li>
              <li class="footer-ul__li"><a href="mailto:ecospectrum.ltd@mail.ru" class="footer-ul__li-a"><span uk-icon="mail"></span> ecospectrum.ltd@mail.ru</a></li>
            </ul>
          </div>
          <div class="uk-width-1-2@m uk-width-expand@l">
            <div class="uk-navbar-container" uk-navbar>
              <div class="uk-navbar-center">
                <ul class="uk-navbar-nav">
                  <nuxt-link
                    v-for="(link, index) of links"
                    :key="index"
                    tag="li"
                    active-class="uk-active"
                    :to="{ name: link.url }"
                    :exact="link.exact"
                  >
                    <a>{{ link.title }}</a>
                  </nuxt-link>
                </ul>
              </div>
            </div>
            <div class="uk-text-center uk-text-muted uk-text-small uk-margin-small-top">
              © 2019г. ООО "Экоспектрум"<br>
              <a href="#" class="uk-text-muted uk-text-small" style="text-decoration: underline">Условия соглашения</a>
            </div>
          </div>
          <div class="uk-visible@l uk-width-1-3@l">
            <nuxt-link class="uk-navbar-item uk-logo uk-flex-right" :to="{ name: 'index' }">
              <img src="@/assets/logo.png" width="200" alt="">
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "mainFooter",
  data: () => ({
    links: [
      { title: 'Услуги', url: 'service' },
      { title: 'Каталог', url: 'catalog' },
      { title: 'Оплата', url: 'payment' },
      { title: 'Доставка', url: 'delivery' },
      { title: 'О компании', url: 'about' }
    ]
  })
}
</script>

<style scoped>
  .uk-navbar-nav a{
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    color: #c5c5c5;
    font-size: 19px;
    min-height: 0;
    padding: 0 6px
  }
  .uk-navbar-container{
    background: transparent!important;
  }
  .uk-navbar-nav a:hover{
    color: white;
  }

  @media (max-width: 360px){
    .uk-navbar-nav a{
      padding: 0 4px;
    }
  }
</style>
