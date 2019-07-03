<template>
  <section>
    <div class="block">
      <h1 class="title is-2">Product Panel</h1>
    </div>
    <table v-if="wnWidth>1024" class="table is-striped is-hoverable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Image</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product,index) in products" :key="product._id">
          <td><strong>{{product.title}}</strong></td>
          <td>{{product.category}}</td>
          <td><i class="fa fa-inr"></i> {{product.price}}</td>
          <td>
            <figure class="image ">
              <img :src="imageURL[index]" id="imgPreview">
            </figure>
          </td>
          <td>
            <router-link :to="{name:'editProduct',params:{id:product._id}}" class="button is-rounded is-info">
              <span>Edit</span>
              <span class="icon is-small">
                <i class="fa fa-edit"></i>
              </span>
            </router-link>
          </td>
          <td>
            <button class="button is-rounded is-danger" @click="deleteProduct(product._id)">
              <span>Delete</span>
              <span class="icon is-small">
                <i class="fa fa-times"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="wnWidth<1024" class="columns">
      <div class="column">
        <div class="card" v-for="(product,index) in products" :key="product._id">
          <div class="card-image">
            <img :src="imageURL[index]" id="cardImage">
          </div>
          <div class="card-content">
            <h1 class="title is-4">{{product.title}}</h1>
            <p class="title is-6">Category: {{product.category}}</p>
            <p class="title is-5">Price: <i class="fa fa-inr"></i> {{product.price}}</p>
            <div class="columns  is-2 is-mobile">
              <div class="column">
                <router-link :to="{name:'editProduct',params:{id:product._id}}" class="button is-rounded is-info">
                  <span>Edit</span>
                  <span class="icon is-small">
                    <i class="fa fa-edit"></i>
                  </span>
                </router-link>
              </div>
              <div class="column">
                <button class="button is-rounded is-danger" @click="deleteProduct(product._id)">
                  <span>Delete</span>
                  <span class="icon is-small">
                    <i class="fa fa-times"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import API from '../../api'

  export default {
    data() {
      return {
        products: '',
        imageURL: '',
        count: '',
        wnWidth: window.screen.width
      }
    },
    created() {
      API().get('admin/products')
        .then(res => {
          this.products = res.data.products;
          this.imageURL = res.data.url;
          this.count = res.data.count;
        })
        .catch(error => console.log(error));
    }
  }

</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";

  $card-shadow:0 5px 5px rgba($black, 0.1),
  0 0 0 1px rgba($black, 0.1);

  .block>h1 {
    margin-top: 1em;
    text-align: center;
  }

  #imgPreview {
    width: 128px;
    height: 128px;
  }

  #cardImage {
    width: 100%;
    height: 256px;
  }

  .table {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2em;
  }

  td {
    vertical-align: middle !important;
    text-align: center !important;
  }

  .columns {
    text-align: center;
  }

  .card {
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

  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
