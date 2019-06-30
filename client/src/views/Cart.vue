<template>
  <div class="container">
    <b-card>
      <h3>Your Cart</h3>
      <div v-if="cart.length == 0" class="m-5">
        <h3>is Empty : (</h3>
      </div>
      <div v-for="(product,index) in calculatedCartKeys" :key="index" style="height:300px;">
        <b-row class="row" style="height:80%;">
          <div class="col-sm-3" style="height:80%">
            <img :src="calculatedCart[product].detail.image" style="height:100%">
          </div>
          <div class="col-sm-9" style="text-align:left">
            <b-card-body>
              <b>Product Name:</b>
              {{calculatedCart[product].detail.name}}
            </b-card-body>
            <b-card-body>
              <b>Product Description:</b>
              {{calculatedCart[product].detail.description}}
            </b-card-body>
            <b-card-body>
              <b>Price :</b>
              {{getPriceFormat(calculatedCart[product].detail.price)}}
            </b-card-body>
            <b-card-body>
              <b>Stock :</b>
              {{calculatedCart[product].detail.quantity}}
              <b>Quantity Buy :</b>
              {{calculatedCart[product].qty}}
              <button
                @click.prevent="subtractQty(product, calculatedCart[product].qty)"
              >-</button>
              <button
                @click.prevent="add(calculatedCart[product].detail.quantity, calculatedCart[product].qty,product)"
              >+</button>
              <hr role="separator" aria-orientation="horizontal">
            </b-card-body>
          </div>
        </b-row>
      </div>
      <!-- <card
      v-for="(product,index) in cart[0]"
      :key="index"
      :product="product"
      :status="status"
      :qtyBuy="cart[1][index]"
      class="col-sm-6 col-md-4 col-lg-3 col-12 my-3"
      />-->
      <b-row class="justify-content-between">
        <div class="col">
          <h2>Total: {{total}}</h2>
        </div>
        <div class="col" >
          <b-row class="justify-content-end">
            <div class="mx-2" v-if='cart.length>0'>
              <b-button class="bg-danger" @click="emptyCart">Empty Cart</b-button>
            </div>
            <div class="mx-2" v-if='cart.length>0'>
              <b-button class="bg-success" @click="checkout(totalRawFormat)">Checkout</b-button>
            </div>
          </b-row>
        </div>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import api from "@/api/api.js";
import Swal from "sweetalert2";

// import { mapState } from 'vuex'
export default {
  name: "cart",
  data() {
    return {
      status: "cart"
    };
  },
  watch: {
    islogin: function() {
      if (this.islogin) {
      } else {
        this.$router.push("/");
      }
    },
    transactions(){
      this.$router.push("/myOrders")
    }
  },
  computed: {
    transactions(){
      return this.$store.state.transactions
    },
    cart() {
      return this.$store.state.cart;
    },
    calculatedCart() {
      let products = {};
      this.cart.forEach(product => {
        if (!products[product._id]) {
          products[product._id] = {};
          products[product._id].qty = 1;
          products[product._id].detail = product;
        } else {
          products[product._id].qty += 1;
        }
      });
      return products;
    },
    calculatedCartKeys() {
      return Object.keys(this.calculatedCart);
    },
    totalRawFormat() {
      let total = 0;
      this.cart.forEach(product => {
        total += product.price;
      });
      return total;
    },
    total() {
      return this.getPriceFormat(this.totalRawFormat);
    },
    islogin () {
      return this.$store.state.islogin
    }
  },
  methods: {
    checkout(total) {
      console.log(total);
      this.$store.dispatch("checkout", total)
      
    },
    emptyCart() {
      this.$store.dispatch("emptyCart");
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
    subtractQty(id, currentQty) {
      if (currentQty - 1 >= 0) {
        this.$store.dispatch("subtractQty", {
          product: id,
          qty: currentQty
        });
      }
    },
    add(stock, currentQty, id) {
      if (currentQty + 1 <= stock) {
        this.$store.dispatch("addToCart", id);
      }
    }
  },
  created() {
    if (!this.islogin) {
      this.$router.push('/')
    } else {
      this.$store.dispatch("getCart");

    }
  },
  watch: {
    islogin: function () {
      if (this.islogin) {
      } else {
        this.$router.push('/')
      }
    }
  },
};
</script>
