<template>
  <section>
    <div class="block">
      <h1 class="title is-2">Category Panel</h1>
      <p class="content is-small">You can change the order of categories by dragging them.(Only available in Desktop
        version)</p>
    </div>
    <div class="buttons is-centered">
      <a href="/admin/add-category" class="button is-primary"> Add a new Category</a>
    </div>
    <table class="table is-striped is-hoverable">
      <thead class="home">
        <th scope="col">Category</th>
        <th scope="col"> Edit</th>
        <th scope="col"> Delete</th>
      </thead>
        <draggable v-model="ab" ghost-class="ghost" @end="onEnd" tag="tbody">
          <tr v-for="abc in ab" :key="abc._id" :id="abc._id" :class="abc.slug">
            <td scope="row">{{abc.title}}</td>
            <td>
              <a href="/admin/edit-category" class="button is-rounded is-small is-info">
                <span>Edit</span>
                <span class="icon is-small">
                  <i class="fa fa-edit"></i>
                </span>
              </a>
            </td>
            <td>
              <a href="/admin/delete-category" class="button is-rounded is-small is-danger">
                <span>Delete</span>
                <span class="icon is-small">
                  <i class="fa fa-times"></i>
                </span>
              </a>
            </td>
          </tr>
        </draggable>
    </table>
  </section>
</template>

<script>
  import draggable from 'vuedraggable'
  import axios from 'axios'
  import API from '../../api'


  export default {

    data() {
      return {
        ab: '',
        oldIndex:'',
        newIndex:''
      }
    },
    components:{
      draggable
    },
    created() {
      API().get('admin/categories')
        .then(res => {
          this.ab = res.data;
        });
    },
    methods:{
      onEnd(event){
        this.oldIndex=event.oldIndex;
        this.newIndex=event.newIndex;
        API().post('/admin/categories/reorder-category',{
          id:event.item.id,
          ids:this.ab.map(element=>element._id)
        }).then(res=>{
          console.log(res);
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

  .block>p {
    text-align: center;
    color: $info;
  }

  .add{
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .table {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2em;
  }

  .ghost{
    font-weight: bold;
    border-left: 6px solid $info;
    box-shadow: 10px 10px 5px -1px rgba(0,0,0,0.14);
    opacity:0.7;
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
