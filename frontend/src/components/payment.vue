<template>
  <section>
    <div class="block">
      <h1 class="title is-3">Payment Page</h1>
    </div>
    <div id="complete">
      <img src="../../public/images/green-tick.gif" alt="">
      <h1 class="title is-3" style="color:green">Your order has been placed successfully!!</h1>
    </div>
    <div class="columns" id="mainColumns">
      <div class="column">
        <div class="box" id="payment">
          <h2 class="title is-4">Payment Information</h2>
          <hr>
          <div class="formInput">
            <div class="field">
              <label class="label">Card Number:</label>
              <div class="control">
                <input class="input" v-model="cardNumber" type="text" placeholder="1111-2222-3333-4444">
              </div>
            </div>
            <div class="field">
              <label class="label">Expiry:</label>
              <div class="columns is-mobile">
                <div class="column is-3">
                  <select v-model="expiryMonth">
                    <option disabled value="">Month</option>
                    <option v-for="index in 12" :key="index">
                      {{index}}
                    </option>
                  </select>
                </div>
                <div class="column is-3 is-offset-1">
                  <select v-model="expiryYear">
                    <option disabled value="">Year</option>
                    <option v-for="index in years" :key="index">
                      {{index}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">CVV: </label>
              <div class="control">
                <div class="columns is-mobile">
                  <div class="column is-3">
                    <input class="input" v-model="cvv" type="password" placeholder="123">
                  </div>
                </div>
              </div>
            </div>
            <button class="button is-rounded is-primary" @click="pay">
              <span class="icon is-small">
                <i class="fa fa-lock"></i>
              </span>
              <span>Confirm and Pay</span>
          </button>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box">
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
              <tr v-for="product in products" :key="product._id" :id="product._id">
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
                {{total}}</b></span></h3>
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
        auth: '',
        axiosConfig: '',
        products: '',
        total: '',
        subTotals: '',
        cart: this.$store.state.cart,
        wnWidth: window.screen.width,
        cardNumber: '',
        cvv: '',
        expiryMonth: '',
        expiryYear: '',
        years:[],
        name:'',
        address:'',
        mobile:'',
        email:'',
        city:'',
        state:'',
        pinCode:''
      }
    },
    created() {
      this.auth = 'Bearer ' + this.$store.state.loginToken;
      this.axiosConfig = {
        headers: {
          'Authorization': this.auth
        }
      };
      API().post('payment-page', {
        cart: this.$store.state.cart
      }, this.axiosConfig)
      .then(res => {
        this.products = res.data.products;
        this.subTotals = this.products.map(product => product.price * product.qty);
        this.total = this.subTotals.reduce((a, b) => a + b, 0);
        for(let i=2019;i<2051;i++){
          this.years.push(i);
        }
        if (this.wnWidth < 1024) {
          document.getElementById('mainColumns').classList.add('reverse-columns');
        }
      })
      .catch(error => {
        console.log(error);
      });
      API().post('my-profile',{
        username:this.$store.state.loginUsername
      },this.axiosConfig)
      .then(res=>{
        this.name=res.data.firstName + ' '+ res.data.lastName;
        this.address=res.data.address;
        this.mobile=res.data.mobile;
        this.email=res.data.email;
        this.city=res.data.city;
        this.state=res.data.state;
        this.pinCode=res.data.pinCode;
      })
      .catch(error=>{
        console.log(error);
      });
    },
    methods: {
      pay(){
        const time=new Date();
        const orderId='ORD'+time.getTime();
        var cart=this.products.map(product=>{
          return {
            id:product._id,
            title:product.title,
            qty:product.qty,
            price:product.price,
            subTotal:product.price*product.qty
          }
        });
        var order={
          name:this.name,
          mobile:this.mobile,
          email:this.email,
          address:this.address,
          city:this.city,
          state:this.state,
          pinCode:this.pinCode,
          orderId:orderId,
          time:time,
          cart:cart,
          cartCount:this.$store.state.cartCount,
          total:this.total
        };
        var payload={
          username:this.$store.state.loginUsername,
          order:order
        };
        API().post('payment-page/order',payload,this.axiosConfig)
        .then(res=>{
          this.$store.commit('clearCart');
          document.getElementById('complete').style.display='block';
          var router=this.$router;
          setTimeout(function(){
            router.push({name:'Home'});
          },3000);
        })
        .catch(error=>{
          console.log(error);
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";

  #complete{
    position: absolute;
    z-index: 10;
    width:100%;
    height:100%;
    background: rgba(255,255,255,1);
    text-align: center;
    display: none;
    img{
      z-index: 11;
    }
    h1{
      margin-top:-1em;
      z-index: 12;
    }

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

  .reverse-columns {
    flex-direction: column-reverse;
    display: flex;
  }

  #mainColumns {
    margin-bottom: 2em;
  }

  .box {
    margin-left: 1em;
    margin-right: 1em;

    h2 {
      margin-left: 1em;
      margin-bottom: 0 !important;
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
      color: grey;
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
  #payment{
    hr{
      margin-top: 0.5em !important;
      margin-bottom: 0.5em !important;
    }
    input{
      z-index: 1;
      border: 0;
      border-radius: 0;
      border-bottom: 2px $info solid;
    }
    input:hover{
      border: 0;
      border-radius: 0;
      border-bottom: 2px $primary solid;
    }
    button{
      z-index: 1;
      background: linear-gradient(135deg,$primary 0%,$info 100%);
    }
    button:hover{
      background: transparent;
	    box-shadow: 0 0 0 3px $primary;
	    color: $primary;
    }
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
