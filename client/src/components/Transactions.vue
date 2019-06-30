<template>
    <div class='p-1'>
  <b-card >
        <b-card-text>
          <h5>
          Order No.: {{history._id}}
          </h5>
          <h6>Shipment Date: {{history.created_at}}</h6>
          <h6 v-if='history.delivered'>Delivery Date: {{history.delivered_date}}</h6>

          <h6>Total: {{getPriceFormat(history.total)}}</h6>
          <h6 v-if='transaction'>User id:{{history.userId._id}}</h6>
          <h6 v-if='transaction'>User name:{{history.userId.name}}</h6>


        </b-card-text>
    <b-card-text>
      Products: 
      <div v-for='(product, index) in history.products'> {{index + 1}}. {{product.name}}</div>
    </b-card-text>
    <b-button @click='completeShipment' v-if='!history.delivered && !transaction' class="card-link">Confirm Delivery</b-button>
  </b-card>
</div>
</template>

<script>
export default{
    name:'transaction',
    props:['history', 'transaction'],
    methods:{
      completeShipment(){
        this.$store.dispatch('completeShipment', this.history._id)
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
    }
}
</script>