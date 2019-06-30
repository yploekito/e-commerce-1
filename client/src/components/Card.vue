<template>
  <div class="productCard" @click='eachProduct'>
    <div class="view overlay">
      <b-card :img-src="product.image" img-alt="Image" overlay></b-card>
      <div class="mask flex-center rgba-white-strong">
        <p class="black-text">{{getPriceFormat(product.price)}}</p>
      </div>
      <p class='mt-2'>{{product.name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Card",
  data() {
    return {
      hover: false
    };
  },
  props: ["product"],
  methods: {
    eachProduct() {
      this.$router.push(`/products/${this.product._id}`);
            window.scrollTo(0, 0)

      console.log("hello");
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
    },
  }
};
</script>
<style>
.mask {
  cursor: pointer;
}
</style>
