<template>
  <section>
    <div class="block">
      <h1 class="title is-2">Product Panel</h1>
    </div>
    <b-table :data="products" :columns="columns" centered></b-table> 
  </section>
</template>

<script>

import API from '../../api'

export default {
  data(){
    return{
      products:'',
      columns:[
        {
          field: '_id',
          label: 'ID',
        },
        {
          field: 'title',
          label: 'Name',
        },
        {
          field: 'image',
          label: 'Image',
        },
        {
          field: 'category',
          label: 'Category',
        },
        {
          field: 'price',
          label: 'Price',
        }
      ]
    }
  },
  created(){
    API().get('admin/products')
    .then(res=>{
      this.products=res.data.products;
    })
    .catch(error=>console.log(err));
  }  
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";

  .block>h1 {
    margin-top: 1em;
    text-align: center;
  }

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
