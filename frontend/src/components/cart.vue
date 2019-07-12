<template>
  <div class="block">
      <h1 class="title is-3">Cart</h1>
  </div>  
</template>

<script>
import API from '../api'

export default {
  data(){
    return{

    }
  },
  created(){
    API().post(`cart`,{
        cart:this.$store.state.cart
    })
    .then(res=>{
      console.log(res.data.products);
      console.log(res.data.productImagesLink);
    })
    .catch(err=>{
      console.log(err);
    });
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";

  .block>h1 {
    margin-top: 2em;
    text-align: center;
  }

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
