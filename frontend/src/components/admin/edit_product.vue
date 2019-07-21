<template>
  <section>
    <div class="block">
      <h1 class="title is-1">Edit Product Page</h1>
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
          <input class="input" v-model="price" type="number" placeholder="Price">
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
          <input class="file-input" type="file" name="image" @change="onFileChange">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fa fa-upload"></i>
            </span>
            <span class="file-label">
              Choose an Image
            </span>
          </span>
          <span class="file-name" v-if="fileName">
            {{fileName}}
          </span>
        </label>
      </div>
      <div class="field" v-if="imageURL">
        <figure class="image ">
          <img :src="imageURL" v-if="imageURL" id="imgPreview">
        </figure>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" :disabled="isDisabled" @click="submitProduct">Submit</button>
        </div>
      </div>
      <div class="field">
        <label class="label">Gallery Images</label>
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropOptions"
          @vdropzone-removed-file="removed" @vdropzone-mounted="manualAddFile"></vue-dropzone>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" @click="submitGalleryImages">Upload Gallery Images</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import API from '../../api'
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import vueDropzone from "vue2-dropzone";

  export default {
    data() {
      return {
        id: this.$route.params.id,
        title: '',
        category: '',
        price: '',
        description: '',
        imageURL: '', //image url of image on s3
        editor: ClassicEditor,
        categoryResponses: '',
        fileName: '', //file name of image
        image: '', //image file by user
        url: '', //url of image uploaded by user
        presentImage: '',
        dropOptions: {
          url: `http://localhost:3000/admin/edit-product/gallery/${this.$route.params.id}`,
          thumbnailWidth: 150,
          maxFiles: 8,
          headers: {
            "My-Awesome-Header": "header value"
          },
          addRemoveLinks: true,
          autoProcessQueue: false,
          parallelUploads:8
        },
        galleryList:'',
        galleryURL:'',
        auth:'',
        axiosConfig:''
      }
    },
    components: {
      vueDropzone: vueDropzone
    },
    methods: {

      manualAddFile(){
        API().get(`admin/edit-product/galleryImages/${this.$route.params.id}`)
        .then(res=>{
          this.galleryList=res.data.list;
          this.galleryURL=res.data.URL;
          for(var i=0;i<this.galleryList.length;i++){
          
            let file={
              size:this.galleryList[i].Size,
              name:this.galleryList[i].Key.split('/')[2],
              type:'image/'+this.galleryList[i].Key.split('/')[2].split('.')[1]
            };
            let url=this.galleryURL[i];
          
            this.$refs.myVueDropzone.manuallyAddFile(file, url);
          };
        })
        .catch(error=>{
          console.log(error);
        });

      },
      submitGalleryImages() {
        this.$refs.myVueDropzone.processQueue();
      },
      removed(file) {
        let deleteFileName=file.name;
        API().get(`admin/edit-product/delete-gallery/${this.$route.params.id}/${deleteFileName}`)
        .then(res=>{
          this.flash('Image removed','error');
        })
        .catch(error=>{
          console.log(error);
        });
      },
      onFileChange(e) {
        this.image = e.target.files[0];
        this.imageURL = URL.createObjectURL(this.image);
        this.fileName = this.image.name;
      },
      submitProduct() {
        let formData = new FormData();

        if (this.image == '') {
          this.image = this.fileName;
        }
        formData.append('image', this.image);
        formData.append('title', this.title);
        formData.append('description', this.description);
        formData.append('price', this.price);
        formData.append('category', this.category);
        formData.append('presentImage', this.presentImage);

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };

        API().post(`admin/edit-product/${this.id}`, formData, config)
          .then(res => {
            if (res.data.errors) {
              if (res.data.errors[0].msg) {
                this.flash(res.data.errors[0].msg, 'error');
              } else if (res.data.errors) {
                this.flash(res.data.errors, 'error');
              }
            } else if (res.data.success) {
              this.flash(res.data.success, 'success');
              this.title = '';
              this.image = '';
              this.description = '';
              this.price = '';
              this.category = '';
              this.url = '';
              this.fileName = '';
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    created() {
      this.auth='Bearer '+ this.$store.state.loginToken;
      this.axiosConfig={
          headers:{
            'Authorization':this.auth
          }
        };
      API().get('admin/categories',this.axiosConfig)
        .then(res => {
          this.categoryResponses = res.data;
        })
        .catch(error => {
          console.log(error);
        });

      API().get(`admin/edit-product/${this.id}`)
        .then(res => {
          this.title = res.data.product.title;
          this.category = res.data.product.category;
          this.price = res.data.product.price;
          this.description = res.data.product.description;
          this.imageURL = res.data.URL;
          this.fileName = res.data.product.image;
          this.presentImage = this.fileName;
        })
        .catch(error => {
          console.log(error);
        })
    },
    computed: {
      isDisabled() {
        return this.title.length < 2 || this.category.length < 2 || this.description.length < 2 || this.price == 0;
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

  #imgPreview {
    width: 128px;
    height: 128px;
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
