<template>
  <section>
    <div class="block">
      <h1 class="title is-3">My Orders</h1>
    </div>
    <!-- orders box -->
    <div class="box" v-for="order in orders" :key="order">
      <div class="columns">
        <div class="column">
          <p style="color:grey"><strong id="orderID">Order ID: </strong>#{{order.orderId}}</p>
          <p><strong>Time: </strong>{{order.time}}</p>
          <p><strong>Name:</strong>{{order.name}}</p>
          <p><strong>Mobile: </strong>{{order.mobile}}</p>
          <p><strong>Email: </strong>{{order.email}}</p>
          <p><strong>Address: </strong>{{order.address}}</p>
          <p><strong>City: </strong>{{order.city}}</p>
          <p><strong>State: </strong>{{order.state}}</p>
          <p><strong>PIN Code: </strong>{{order.pinCode}}</p>
        </div>
        <div class="column">
          <h2 class="title is-5">Order Summary</h2>
          <hr>
          <table class="table is-narrow">
            <thead>
              <tr>
                <th>
                  <p>Item</p>
                </th>
                <th>
                  <p>Price</p>
                </th>
                <th></th>
                <th style="text-align:left">
                  <p>Qty</p>
                </th>
                <th>
                  <p>Subtotal</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in order.cart" :key="product" :id="product._id">
                <td>
                  <p><strong>{{product.title}}</strong></p>
                </td>
                <td>
                  <p><i class="fa fa-inr"></i> {{product.price}}</p>
                </td>
                <td>
                  <p><i class="fa fa-times"></i></p>
                </td>
                <td>
                  <p>{{product.qty}}</p>
                </td>
                <td>
                  <p><i class="fa fa-inr"></i> {{product.price*product.qty}}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr>
          <h3 class="title is-5">Total <span class="price" style="color:black"><b><i class="fa fa-inr"></i>
                {{order.total}}</b></span></h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

  import API from '../api'

  export default {
    data() {
      return {
        username: this.$store.state.loginUsername,
        email: '',
        mobile: '',
        address: '',
        pinCode: '',
        auth:'',
        axiosConfig:'',
        orders:''
      }
    },
    created(){
      this.auth='Bearer '+ this.$store.state.loginToken;
      this.axiosConfig={
        headers:{
          'Authorization':this.auth
        }
      };
      API().post('my-orders',{
        username:this.username
      },this.axiosConfig)
      .then(res=>{
        this.orders=res.data.orders;
      })
      .catch(error=>{
        console.log(error);
      });
    },
    methods: {

    }
  }

</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";

  section{
    margin-bottom: 2em;
  }

  .block>h1 {
    margin-top: 2em;
    text-align: center;
  }

  .label {
    margin-left: 0.5em;
  }

  .formInput {
    margin: auto 2em;
    margin-bottom: 3em;
  }
  .box {
    margin-left: 1em;
    margin-right: 1em;
    strong#orderID{
      color: $primary;
    }
    h2 {
      margin-left: 1em;
      margin-bottom: 0 !important;
      color: $info;
    }

    hr {
      margin-top: 0 !important;
      margin-bottom: 0.5em !important;
    }

    .table {
      margin-bottom: 0 !important;

      td {
        border: 0 !important;
      }
    }

    span.price {
      float: right;
      color: green !important;
    }

    h3 {
      margin-right: 1em !important;
      margin-left: 1em !important;
    }
    select{
      background-color: #fff;
      font-size: 1.3em;
      border: 0;
      border-bottom: 2px $info solid;
    }
    select:hover{
      border: 0;
      border-bottom: 2px $primary solid;
    }
    select:active{
      border: 0;
      border-bottom: 2px $primary solid;
    }
  }
  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
