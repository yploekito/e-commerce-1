<template>
  <div id="displayProduct">
    <b-row style="height:100%">
      <b-col cols="8">
        <img :src="product.image" class="mt-3 product">
        <!-- {{product}} -->
      </b-col>
      <b-col cols="4" class="pr-5" style="text-align:left; margin:auto">
        <div>
          <h3>{{product.name}}</h3>
          <p>{{product.description}}</p>
          <h5>{{getPriceFormat(product.price)}}</h5>
        </div>
        <b-button @click="addToCart">Add to cart</b-button>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Swal from "sweetalert2";

export default {
  name: "eachProduct",
  watch: {
    "$route.params.id": {
      handler: function() {
        this.$store.dispatch("getOneProduct", this.$route.params.id);
      }
    }
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
    islogin() {
      return this.$store.state.islogin;
    }
  },
  methods: {
    addToCart() {
      if (this.islogin) {
        this.$store.dispatch("addToCart", this.$route.params.id);
      } else {
        Swal.fire({
          type: "error",
          text: "Please sign in first",
        });
      }
    },
    gotoSignin(){
        console.log('hai')
        this.$router.push('/')
    },
    getPriceFormat(price) {
      let newPrice = price + "";
      let array = [];
      for (let i = newPrice.length - 1; i >= 0; i -= 3) {
        let first = newPrice[i - 2] || "";
        let second = newPrice[i - 1] || "";
        let temp = first + second + newPrice[i];
        array.unshift(temp);
      }
      newPrice = array.join(".");
      newPrice = "IDR " + newPrice;
      return newPrice;
    }
  },
  created() {
    this.$store.dispatch("getOneProduct", this.$route.params.id);
  }
};
</script>
<style>
#displayProduct {
  background-color: #f5f5f5;
  height: 60vh;
}
img.product {
  height: 95%;
}
</style>