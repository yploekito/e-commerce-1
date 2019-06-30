<template>
<div>

  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators
    img-width="1024"
    img-height="480"
  >
    <b-carousel-slide
      caption=""
      img-src="//cdn.shopify.com/s/files/1/0238/2821/files/190416_HP_Secondary-hero_royale-blanco_desktop_906878de-89d4-40f0-a8dd-fdf3197ed671.jpg?v=1560881242"
      caption-tag='h1'
    ></b-carousel-slide>
    <b-carousel-slide
      caption=""
      img-src="//cdn.shopify.com/s/files/1/0238/2821/files/190416_HP_Secondary-hero_w-royale-blush-perf_desktop_0cd2ae85-b0e8-41eb-96d0-7b475c45d2b4.jpg?v=1560881242"
      caption-tag='h1'

    ></b-carousel-slide>
    <b-carousel-slide
      caption=""
      img-src="//cdn.shopify.com/s/files/1/0238/2821/files/190604_floral_HP_Secondary_carousel_desktop.jpg?v=1560175654"
            caption-tag='h1'

    ></b-carousel-slide>
  </b-carousel>
  <div class='mt-5 mb-2'>
    <h3>BrandLocal top pick</h3>
  </div>
  <div class='container py-5'>
  <b-row>

    <b-col v-for='(product, index) in products' v-if='index < 4' :key='index' cols='3'>
  <card :product='product' />
  </b-col>
  
  </b-row>
  </div>

</div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'


export default {
  name: 'home',
  components: {
    Card
  },
  
  computed:{
    products(){
      return this.$store.state.products
    }
  }
}
</script>
