<template>
  <div class="block">
      <h1 class="title is-1">{{products}}</h1>
  </div>  
</template>

<script>

import API from '../../api'

export default {
  data(){
    return{
      products:''
    }
  },
  created(){
    API().get('admin/products')
    .then(res=>{
      this.products=res.data;
    })
    .catch(error=>console.log(err));
  }  
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
