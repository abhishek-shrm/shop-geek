<template>
  <section>
    <div class="block">
      <h1 class="title is-3">Add Product Page</h1>
    </div>
    <div class="formInput">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input class="input" v-model="title" type="text" placeholder="Title">
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <ckeditor :editor="editor" v-model="description" tag-name="textarea" placeholder="Description"></ckeditor>
      </div>
      <div class="field">
        <label class="label">Category</label>
        <div class="select">
          <select v-model="category">
            <option disabled value="">Please select one</option>
            <option v-for="categoryResponse in categoryResponses" :key="categoryResponse._id">
              {{categoryResponse.title}}
            </option>
          </select>
        </div>
      </div>
      <div class="field">
        <label class="label">Price</label>
        <p class="control has-icons-left has-icons-right">
          <input class="input" v-model="price" type="text" placeholder="Price">
          <span class="icon is-left">
            <i class="fa fa-inr"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Image</label>
      </div>
      <div class="file field">
        <label class="file-label">
          <input class="file-input" type="file" name="image" id="img">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fa fa-upload"></i>
            </span>
            <span class="file-label">
              Choose an Image
            </span>
          </span>
        </label>
      </div>
      <div class="field">
        <figure class="image is-128x128">
          <img src="#" id="imgPreview">
        </figure>
      </div>
    </div>
  </section>
</template>

<script>
  import API from '../../api'
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

  export default {
    data() {
      return {
        title: '',
        description: '',
        price: '',
        category: '',
        editor: ClassicEditor,
        categoryResponses: ''
      }
    },
    created() {
      API().get('admin/categories')
        .then(res => {
          this.categoryResponses = res.data;
        });
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
