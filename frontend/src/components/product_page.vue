<template>
  <section>
    <div class="columns">
      <div class="column is-full">
        <h1 class="title is-3">{{product.title}}</h1>
      </div>
    </div>
    <div class="columns" id="productContent">
      <!-- image side -->
      <div class="column is-half">
        <img :src="imageURL" :alt="product.image">
        <ul class="gallery">
          <li v-for="(image, index) in images" :key="index" style="display: inline-block">
            <img :src="image.thumb" style="height: 80px" @click="openGallery(index)">
          </li>
        </ul>
        <LightBox :images="images" ref="lightbox" :show-light-box="false">
        </LightBox>
      </div>
      <!-- content side -->
      <div class="column is-two-fifths" id="productText">
        <h2 class="title is-4">Price: <span><i class="fa fa-inr" style="font-size:1em"></i>{{product.price}}</span></h2>
        <div class="field is-horizontal">
          <div class="select">
            <select v-model="qty">
              <option disabled value="">Qty</option>
              <option v-for="qty in 10" :key="qty">
                {{qty}}
              </option>
            </select>
          </div>
        </div>
        <button class="button is-primary" :disabled="qty==''" @click="addToCart(product._id,qty)"><i class="fa fa-shopping-cart"></i> Add to Cart</button>
        <h3 class="title is-5">Description:</h3>
        <p v-html="product.description"></p>
      </div>
      <div class="column"></div>
    </div>
  </section>
</template>

<script>
  import API from '../api'
  import LightBox from 'vue-image-lightbox'
  require('vue-image-lightbox/dist/vue-image-lightbox.min.css');

  export default {
    data() {
      return {
        product: '',
        imageURL: '',
        galleryImagesURL: '',
        thumbsURL: '',
        images: [],
        qty: ''
      }
    },
    components: {
      LightBox,
    },
    created() {
      API().get(`product-page/${this.$route.params.productName}`)
        .then(res => {
          this.product = res.data.product;
          this.imageURL = res.data.imageURL;
          this.galleryImagesURL = res.data.galleryImageLink;
          this.thumbsURL = res.data.thumbsImageLink;
          this.makeImageObject();
        })
        .catch(err => {
          console.log(err);
        });
    },
    methods: {
      addToCart(ID,qty){
        let item={
          id:ID,
          qty:parseInt(qty)
        };
        this.$store.commit('addToCart', item);
      },
      //for pushing link of image and thumbs into images array for lightbox
      makeImageObject() {
        var initialObject = {
          thumb: this.imageURL,
          src: this.imageURL
        };
        this.images.push(initialObject);
        for (var i = 0; i < this.galleryImagesURL.length; i++) {
          var obj = {
            thumb: this.thumbsURL[i],
            src: this.galleryImagesURL[i]
          };
          this.images.push(obj);
        }
      },
      openGallery(index) {
        this.$refs.lightbox.showImage(index)
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

  .columns {
    text-align: center;

    .column {
      ul {
        margin-top: 1em;

        li {
          img:hover {
            border: 2px $primary solid;
          }
        }
      }

      h1 {
        margin-top: 2em;
        text-align: center;
      }

      h2 {
        text-align: left;
        margin-bottom: 0.5em;
      }

      h3 {
        text-align: left;
        margin-bottom: 0.5em;
      }

      img {
        height: 20em;
      }

      p {
        font-size: 0.8em;
        text-align: left;
      }

      span {
        color: #c73b1c;
      }

      button {
        margin-bottom: 1em;
        margin-left: 0.5em;

        i {
          margin-right: 0.3em;
        }
      }
    }
  }

  #productContent {
    margin-bottom: 1em;
  }

  #productText {
    margin-left: 1em;
    margin-right: 1em;
    text-align: left;
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
