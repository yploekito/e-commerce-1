import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api.js'
import Swal from "sweetalert2";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin:'',
    admin:false,
    products:[],
    product:'',
    cart:[],
    history:[],
    transactions:[]
  },
  mutations: {
    login (state, name) {
      if(name){
        state.islogin = name
      }else{
        state.islogin = ''
      }
    },
    admin (state, boolean){
      state.admin = boolean
    },
    getProducts(state, data){
      state.products = data
    },
    getOneProduct(state,data){
      state.product = data
    },
    addToCart(state,data){
      state.cart = data
    },
    getCart(state,data){
      state.cart = data
    },
    getHistory(state,data){
      state.history = data
    },
    getTransactions(state,data){
      state.transactions = data
    }
  },
  actions: {
    getProducts(context){
      console.log('hmm')
      api
        .get('/product')
        .then(({ data }) => {
          context.commit('getProducts', data)
          
        })
        .catch(err => {
          console.log('disini error')
          console.log(err)
        })
    },
    getOneProduct(context, id){
      console.log('hai')
      api
        .get(`/product/${id}`, {headers:{
          token:localStorage.getItem('token')
        }})
        .then(({data})=>{
          context.commit('getOneProduct', data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    addToCart(context, id){
      console.log('addtocart')
      console.log(localStorage.getItem('token'))
      api
        .patch(`/user/cart/add/${id}`, {}, {headers:{
          token:localStorage.getItem('token')
        }})
        .then(({data})=>{
          context.commit('addToCart', data.cart)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    getCart(context){
      api
        .get('/user/cart', {headers:{
          token:localStorage.getItem('token')
        }})
        .then(({data})=>{
          console.log(data, 'getCart')
          context.commit('getCart', data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    subtractQty(context, payload){
       api
        .patch(`/user/cart/remove/${payload.product}`, {},{headers:{
          token:localStorage.getItem('token')
        }})
        .then(({ data }) => {
          console.log(payload.qty, 'qty')
          console.log('hello')
          for (let i = 0; i < payload.qty - 1; i++) {
            context.dispatch('addToCart', payload.product)
          }
          if (payload.qty === 1) {
            context.dispatch('getCart')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    emptyCart (context) {
      let payload = {}
      api
        .patch('/user/cart', {},{headers:{
          token:localStorage.getItem('token')
        }})
        .then(({ data }) => {
          // console.log(data)
          context.dispatch('getCart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkout(context, total){
      api
        .post('/transaction', {total}, {headers:{
          token:localStorage.getItem('token')
        }})
        .then(({data})=>{
          console.log(data, 'success checkout')
          context.dispatch('getCart')
          context.dispatch('getTransactions')
          context.dispatch('emptyCart')
          Swal.fire({
            text: "Transaction successful",
          });
        })
        .catch(err=>{
          if(err.response.status === 400 && err.response.data.error.error === 'quantity'){
            Swal.fire({
              type: "error",
              text: "Item is out of stock",
            });     
          }
          console.log(err.response)
        })
    },
    getHistory(context){
      api
        .get('/transaction/history', {headers:{
          token:localStorage.getItem('token')
        }})
        .then(({data})=>
        context.commit('getHistory', data))
        .catch(err=>{
          console.log(err)
        })
    },
    completeShipment(context, id){
      api
        .patch(`/transaction/${id}`,{}, {headers:{
          token:localStorage.getItem('token')
        }})
        .then(({data})=>{
          context.dispatch('getHistory')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    getTransactions(context){
      api
        .get('/transaction',{headers:{
          token:localStorage.getItem('token')
        }} )
        .then(({data})=>{
          context.commit('getTransactions', data)
        })
        .catch(err=>{
          console.log(err)
        })
    }
  }
})
