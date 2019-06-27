<template>
  <section>
    <div class="block">
      <h1 class="title is-3">Add Category</h1>
    </div>
    <div class="formInput">
      <div class="field">
        <label class="label">Category</label>
        <div class="control">
          <input class="input" v-model="category" type="text" placeholder="Category">
        </div>
      </div>
      <div class="control">
        <button class="button is-primary" :disabled="category.length<2"  @click="submitCategory">Submit</button>
      </div>
    </div>
  </section>

</template>

<script>
import API from '../../api'

  export default {

    data(){
      return{
        category:''
      }
    },
    methods: {
      submitCategory(){
        API().post('admin/add-category',{
          title:this.category
        })
        .then(res=>{
          if(res.data.error){
            this.flash(res.data.error,'error');
          }else if(res.data.success){
            this.flash(res.data.success,'success');
            this.category='';
          }
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

  .block>h1 {
    margin-top: 1em;
    text-align: center;
  }

  .label {
    margin-left: 0.5em;
  }

  .formInput {
    margin: auto 2em;
    margin-bottom: 3em;
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
