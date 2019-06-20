<template>
  <div class="block">
      <h1 class="title is-1" v-for="abc in ab" :key="abc._id">{{abc.title}}</h1>
  </div>  
</template>

<script>

import axios from 'axios'
import API from '../../api'


export default {

  data(){
    return{
      ab:''
    }
  },
  created(){
    API().get('admin/categories')
    .then(res=>{
      this.ab=res.data;
    });
  }
  
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";

.block>h1{
  margin-top: 1em;
}

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
