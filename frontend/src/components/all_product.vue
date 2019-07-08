<template>
  <section>
    <div class="block">
      <h1 class="title is-3">All Products</h1>
    </div>
    <div class="columns">
      <div class="column">
        <div class="card" v-for="(product,index) in products" :key="product._id">
          <router-link :to="{name:'productPage',params:{productName:product.slug,id:product._id}}" tag="a">
            <div class="card-image">
            <img :src="imageURL[index]" id="cardImage">
          </div>
          <div class="card-content">
            <h1 class="title is-4">{{product.title}}</h1>
            <p class="title is-6">Category: {{product.category}}</p>
            <p class="title is-5">Price: <i class="fa fa-inr"></i> {{product.price}}</p>
          </div>
          </router-link>
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
        products: '',
        imageURL: ''
      }
    },
    created() {
      API().get('admin/products')
        .then(res => {
          this.products = res.data.products;
          this.imageURL = res.data.url;
        })
        .catch(error => console.log(error));
    }
  }

</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";

  $card-shadow:0 5px 5px rgba($black, 0.1),
  0 0 0 1px rgba($black, 0.1);

  .block h1 {
    margin-top: 2em;
    text-align: center;
  }
  #cardImage {
    width: 100%;
    height: 256px;
  }
  .columns {
    text-align: center;
  }
  .card {
    height: 485.950;
    width: 300px;
    margin-bottom: 1em;
    border-radius: 25px 25px;
    display: inline-block;
    margin-left: 1em;

    .card-image {
      img {
        border-radius: 25px 25px 0 0;
      }
    }
  }

  .card:hover{
    transform: scale(1.1);
    z-index:20;
    border:2px $primary solid;
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
