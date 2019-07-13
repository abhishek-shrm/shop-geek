<template>
  <section>
    <div class="block">
      <h1 class="title is-3">Cart</h1>
    </div>

    <table v-if="wnWidth>1024" class="table is-striped is-hoverable">
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
        <tr v-for="(product,index) in products" :key="product._id">
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
                <button class="button is-rounded is-small is-danger remove" @click="removeProduct(product._id)">
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
              <span class="button is-primary is-rounded" @click="incQty(product._id)">-</span>
              <span class="button is-static">{{product.qty}}</span>
              <span class="button is-primary is-rounded" @click="decQty(product._id)">+</span>
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
          <td>
            <button class="button is-rounded is-danger remove" @click="clearCart">
              <span>Clear Cart</span>
              <span class="icon is-small">
                <i class="fa fa-times"></i>
              </span>
            </button>
          </td>
          <td></td>
          <td><strong>Total =</strong></td>
          <td><strong><i class="fa fa-inr"></i> {{total}}</strong></td>
        </tr>
      </tbody>
    </table>
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
        subTotals: []
      }
    },
    created() {
      API().post(`cart`, {
          cart: this.$store.state.cart
        })
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

        }
      },
      removeProduct(id) {
        if (confirm("Do you really want to remove this product from cart?")) {

        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";

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

  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
