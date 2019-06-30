<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="secondary">
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/products">Products</b-nav-item>
        <b-nav-item to="/sell" v-if="islogin && admin">Sell</b-nav-item>

        <b-nav-item to="/transactions" v-if="islogin && admin">Transactions</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!islogin" @click="$bvModal.show('login-modal')">Signin</b-nav-item>
        <b-nav-item disabled v-if="this.islogin">Welcome, {{this.islogin}}</b-nav-item>
        <b-nav-item to="/cart" v-if="islogin && !admin">
          Cart
          <b-badge v-if="cart.length>0" variant="info" class="ml-1">{{cart.length}}</b-badge>
        </b-nav-item>
        <b-nav-item to="/myOrders" v-if="islogin && !admin">
        My Orders
          <b-badge v-if="calculateTransactions>0" variant="info" class="ml-1">{{calculateTransactions}}</b-badge>
        </b-nav-item>
        <b-nav-item v-if="islogin" @click="logout">logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view/>
    <b-modal id="login-modal" hide-footer>
      <template slot="modal-title">Login Here</template>
      <div class="d-block text-center">
        <div>
          <b-form @submit.prevent="submit">
            <b-form-group id="name" label="Your Name:" label-for="name" v-if="register">
              <b-form-input id="input-name" v-model="name" required placeholder="Enter name"></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="email"
                type="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="password" label="Password:" label-for="password">
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
          <a href="#" v-if="!register" @click.prevent="toRegister(true)">no account yet? click here</a>
          <a
            href="#"
            v-if="register"
            @click.prevent="toRegister(false)"
          >already have an account? click here</a>
        </div>
      </div>
    </b-modal>
    <footer style="background-color:#81c1c6">
      <b-container>
        <b-row>
          <b-col style="padding:20px; ">
            <p>This website is created for the use of educational purposes by Yonathan Lukito</p>
            <p>BrandLocal 2019 || www.yploekito.com/BrandLocal</p>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>
<script>
import api from "@/api/api.js";
import Swal from "sweetalert2";

export default {
  name: "app",
  computed: {
    islogin() {
      return this.$store.state.islogin;
    },
    admin() {
      return this.$store.state.admin;
    },
    cart() {
      return this.$store.state.cart;
    },
    transactions() {
      return this.$store.state.transactions;
    },
    calculateTransactions(){
      let counter = 0
      for(let i = 0 ; i<this.transactions.length;i++){
        if(!this.transactions[i].delivered){
          counter ++
        }
      }
      return counter
    }
  },
  data() {
    return {
      register: false,
      name: "",
      email: "",
      password: ""
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      api
        .get("/authentication", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.$store.commit("login", data.name);
          this.$store.commit("getCart", data.cart);
          this.$store.commit("admin", data.admin);
          this.$store.dispatch("getTransactions");
        })
        .catch(err => {
          console.log(err);
        });
    }
    this.$store.dispatch("getProducts");
  },
  methods: {
    toRegister(data) {
      this.register = data;
    },
    logout() {
      localStorage.removeItem("token");
      Swal.fire(`See you again ${this.islogin}`);
      this.$store.commit("login", false);
    },
    submit() {
      if (!this.register) {
        api
          .post("/signin", { email: this.email, password: this.password })
          .then(({ data }) => {
            console.log(data);
            this.$store.commit("admin", data.data.admin);
            localStorage.setItem("token", data.token);
            this.$store.dispatch("getTransactions");

            this.$store.commit("login", data.data.name);
            this.$bvModal.hide("login-modal");
            Swal.fire(`Hello ${data.data.name}, welcome back!`);
            this.email = "";
            this.password = "";
          })
          .catch(err => {
            Swal.fire(`Wrong email/password`);
            console.log(err);
          });
      } else {
        api
          .post("/signup", {
            name: this.name,
            email: this.email,
            password: this.password,
            admin: false
          })
          .then(({ data }) => {
            return api.post("/signin", {
              email: this.email,
              password: this.password
            });
          })
          .then(({ data }) => {
            localStorage.setItem("token", data.token);
            this.$store.dispatch("getTransactions");

            this.$store.commit("admin", data.data.admin);
            this.$store.commit("login", data.name);
            this.$bvModal.hide("login-modal");
            Swal.fire(`Hello ${data.data.name}, welcome back!`);
            this.name = "";
            this.email = "";
            this.password = "";
          })
          .catch(err => {
            console.log(err);
            Swal.fire(`Email has been used`);
          });
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
html {
  scroll-behavior: smooth;
}
</style>
