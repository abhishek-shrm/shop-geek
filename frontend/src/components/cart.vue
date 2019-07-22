<template>
  <section>
    <div class="block">
      <h1 class="title is-3">Cart</h1>
    </div>
    <div class="block browse" v-if="!cart.length">
      <h1 class="title is-4">Your Cart is currently empty</h1>
      <router-link :to="{name:'allProduct'}" class="button is-info" tag="button">
        Browse Products
      </router-link>
    </div>

    <!-- table for desktop users starts here -->
    <table v-if="wnWidth>1024 && cart.length" class="table is-striped is-hoverable">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th></th>
          <th style="text-align:center">Qty</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product,index) in products" :key="product._id" :id="product._id">
          <td>
            <div class="columns">
              <div class="column is-two-fifths">
                <router-link :to="{name:'productPage',params:{productName:product.slug}}" tag="a" target="_blank">
                  <img :src="imagesLink[index]" id="imgPreview">
                </router-link>
              </div>
              <div class="column is-three-fifths">
                <strong>{{product.title}}</strong>
                <br>
                <span class="tag is-primary is-rounded">{{product.category}}</span>
                <br>
                <button class="button is-rounded is-small is-danger remove" @click="removeProduct(product)">
                  <span>Remove Product</span>
                  <span class="icon is-small">
                    <i class="fa fa-times"></i>
                  </span>
                </button>
              </div>
            </div>
          </td>
          <td><i class="fa fa-inr"></i> {{product.price}}</td>
          <td><i class="fa fa-times"></i></td>
          <td>
            <div class="buttons has-addons is-centered">
              <span class="button is-primary is-rounded" :disabled="product.qty<=1"
                @click="product.qty--;decQty(product._id)">-</span>
              <span class="button is-static">{{product.qty}}</span>
              <span class="button is-primary is-rounded" :disabled="product.qty>=10"
                @click="product.qty++;incQty(product._id)">+</span>
            </div>
          </td>
          <td><i class="fa fa-inr"></i> {{product.price*product.qty}}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td><strong>Quantity =</strong></td>
          <td><strong>{{$store.state.cartCount}}</strong></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td><strong>Total =</strong></td>
          <td><strong><i class="fa fa-inr"></i> {{total}}</strong></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <button class="button is-rounded is-danger" @click="clearCart">
              <span>Clear Cart</span>
              <span class="icon is-small">
                <i class="fa fa-times"></i>
              </span>
            </button>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
          <button class="button is-rounded is-primary" @click="checkOut($store.state.cart)">
            <span>Checkout</span>
            <span class="icon is-small">
              <i class="fa fa-shopping-cart"></i>
            </span>
          </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- table for desktop users end here -->

    <!-- cards for mobile users starts here -->
    <div v-if="wnWidth<1024 && cart.length">
      <div class="columns" style="margin-left:0.5em">
        <div class="column">
          <div class="card" v-for="(product,index) in products" :key="product._id" :id="product._id">
            <div class="columns is-mobile">
              <div class="column is-two-fifths">
                <router-link :to="{name:'productPage',params:{productName:product.slug}}" tag="a" target="_blank">
                  <img :src="imagesLink[index]" id="imgPreview">
                </router-link>
              </div>
              <div class="column is-three-fifths">
                <strong>{{product.title}}</strong>
                <br>
                <span class="tag is-primary is-rounded">{{product.category}}</span>
                <br>
                <div class="columns is-mobile" style="margin-bottom:0">
                  <div class="column" style="padding-bottom:0">
                    <p style="margin-top:0.25em;"><i class="fa fa-inr"></i> {{product.price}}</p>
                  </div>
                  <div class="column" style="padding:0">
                    <div class="buttons has-addons" style="margin-bottom:0;">
                      <span class="button is-primary is-small is-rounded" :disabled="product.qty<=1"
                        @click="product.qty--;decQty(product._id)">-</span>
                      <span class="button is-small is-static">{{product.qty}}</span>
                      <span class="button is-small is-primary is-rounded" :disabled="product.qty>=10"
                        @click="product.qty++;incQty(product._id)">+</span>
                    </div>
                  </div>
                </div>
                <p style="color:green"><strong>Subtotal: </strong><i class="fa fa-inr"></i>
                  {{product.price*product.qty}}
                </p>
                <button style="margin-bottom:1em;" class="button is-rounded is-small is-danger"
                  @click="removeProduct(product)">
                  <span>Remove Product</span>
                  <span class="icon is-small">
                    <i class="fa fa-times"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="column" style="margin-left:50%;">
          <h1 class="title is-5"><strong>Quantity= {{$store.state.cartCount}}</strong></h1>
          <h1 class="title is-5" style="color:green;"><strong style="color:black">Total= </strong><i
              class="fa fa-inr"></i> {{total}}</h1>
          <button class="button is-rounded is-danger" @click="clearCart">
            <span>Clear Cart</span>
            <span class="icon is-small">
              <i class="fa fa-times"></i>
            </span>
          </button>
          <br>
          <button class="button is-rounded is-primary remove browse" @click="checkOut($store.state.cart)">
            <span>Checkout</span>
            <span class="icon is-small">
              <i class="fa fa-shopping-cart"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
    <!-- cards for mobile users starts here -->
  </section>
</template>

<script>
  import API from '../api'

  export default {
    data() {
      return {
        products: '',
        imagesLink: '',
        wnWidth: window.screen.width,
        total: 0,
        subTotals: [],
        cart: this.$store.state.cart,
        auth:'',
        axiosConfig:''
      }
    },
    created() {
      this.auth='Bearer '+ this.$store.state.loginToken;
      this.axiosConfig={
          headers:{
            'Authorization':this.auth
          }
      };
      API().post(`cart`, {
          cart: this.$store.state.cart
        },this.axiosConfig)
        .then(res => {
          this.products = res.data.products;
          this.imagesLink = res.data.productImagesLink;
          this.subTotals = this.products.map(product => product.price * product.qty);
          this.total = this.subTotals.reduce((a, b) => a + b, 0);
        })
        .catch(err => {
          console.log(err);
        });
    },
    methods: {
      clearCart() {
        if (confirm("Do you really want to empty the cart?")) {
          this.$store.commit('clearCart');
          this.$router.go();
        }
      },
      removeProduct(product) {
        if (confirm("Do you really want to remove this product from cart?")) {
          let item = {
            id: product._id,
            qty: product.qty
          };
          this.$store.commit('removeProduct', item);
          document.getElementById(product._id).classList.add('display-none');
          API().post(`cart`, {
              cart: this.$store.state.cart
            },this.axiosConfig)
            .then(res => {
              this.products = res.data.products;
              this.imagesLink = res.data.productImagesLink;
              this.subTotals = this.products.map(product => product.price * product.qty);
              this.total = this.subTotals.reduce((a, b) => a + b, 0);
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      incQty(id) {
        this.subTotals = this.products.map(product => product.price * product.qty);
        this.total = this.subTotals.reduce((a, b) => a + b, 0);
        this.$store.commit('incQty', id);
      },
      decQty(id) {
        this.subTotals = this.products.map(product => product.price * product.qty);
        this.total = this.subTotals.reduce((a, b) => a + b, 0);
        this.$store.commit('decQty', id);
      },
      checkOut(cart){
        this.$router.push({name:'paymentPage'});
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";

  $card-shadow:0 5px 5px rgba($black, 0.1),
  0 0 0 1px rgba($black, 0.1);

  .block>h1 {
    margin-top: 2em;
    text-align: center;
  }

  #imgPreview {
    width: 128px;
    height: 128px;
  }

  .table {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2em;

    thead {
      text-align: center;
    }

    td {
      vertical-align: middle !important;
      text-align: center !important;
    }
  }

  .remove {
    margin-top: 1em;
  }

  .remove:hover {
    transform: scale(1.05);
  }

  .browse {
    text-align: center;
    margin-bottom: 2em;
  }

  .display-none {
    display: none !important;
  }

  .card {
    width: 98%;
    margin-bottom: 1em;
    border-radius: 10px 10px;
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
