<template>
    <div>
    <div class='container'>
        <b-row class='p-5'>
            <h2> Pending </h2>
            <b-col v-if='!history.delivered' v-for='(history, index) in histories' cols='12' :key='index'>
                <Transaction :history='history' :transaction='transaction'/>

                </b-col>
            </b-row>
        <b-row class='p-5'>
            <h2> Completed </h2>
            <b-col v-if='history.delivered' v-for='(history, index) in histories' cols='12' :key='index'>
                <Transaction :history='history' :transaction='transaction'/>
                </b-col>
            </b-row>
        </div>
    </div>
</template>
<script>
import Transaction from '@/components/Transactions.vue'

export default{
    name:'orders',
    data(){
        return{
            transaction: true
        }
    },
    computed:{
        histories(){
            return this.$store.state.transactions
        },
        admin(){
            return this.$store.state.admin
        },
        islogin(){
            return this.$store.state.islogin
        }
    },
    components:{
        Transaction
    },
    created(){
        if(!this.islogin && !this.admin){
            this.$router.push('/')
        }else{
            this.$store.dispatch('getTransactions')
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
}
</script>