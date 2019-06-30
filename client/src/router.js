import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Product from './views/Product.vue'
import Sell from './views/Sell.vue'
import Admin from './views/Admin.vue'
import eachProduct from './views/eachProduct.vue'
import cart from './views/Cart.vue'
import MyOrders from './views/myOrders.vue'
import Transactions from './views/allTransactions.vue'
import SigninSignup from './views/signin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/transactions',
      name: 'transactions',
      component: Transactions
    },
    {
      path: '/products',
      name: 'products',
      component: Product,
      children:[
        {
          path: '/products/:id',
          name: 'eachProduct',
          component: eachProduct
        }
      ]
    },
    {
      path:'/myOrders',
      name:'myOrders',
      component:MyOrders
    },
    {
      path:'/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/sell',
      name: 'sell',
      component: Sell
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
    
  ]
})
