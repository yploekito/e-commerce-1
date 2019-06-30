<template>
<div>
    <router-view />
<div class='container'>
<div class='py-5'>
    <h3>All Products</h3>
</div>
   <b-row>

    <b-col v-for='(product, index) in products' :key='index' cols='3'>
  <card :product='product'/>
  </b-col>
  
  </b-row>
  </div>
  </div>
</template>
<script>
import card from '@/components/Card.vue'
export default{
    name:'products',
    components:{
        card
    },
    computed:{
        products(){
            return this.$store.state.products
        }
    }
}
</script>
