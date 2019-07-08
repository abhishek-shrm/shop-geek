<template>
  <div class="header">
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a id="brand" class="navbar-item" href="/">
          <img src="../assets/logo2.png" width="112" height="52">
        </a>
          <a class="navbar-item is-right mobileCart">
            <i class="fa" style="font-size:24px">&#xf07a;</i>
            <span class='badge badge-warning' id='lblCartCount'> 5 </span>
          </a>
        <a role="button" class="navbar-burger burger" @click="toggleClass" aria-label="menu" aria-expanded="false"
          data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href="/">
            Home
          </a>

          <a class="navbar-item" href="/admin/categories">
            Categories
          </a>

          <div class="navbar-item has-dropdown is-hoverable" @click="toggleDropdown">
            <a class="navbar-link">
              Products
            </a>

            <div class="navbar-dropdown">
              <router-link :to="{name:'allProduct'}" class="navbar-item" tag="a">
                All Products
              </router-link>
              <!-- <a class="navbar-item">
                All Products
              </a> -->
              <a class="navbar-item" v-for="category in categories" :key="category._id">
                {{category.title}}
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <a class="navbar-item desktopCart">
            <i class="fa" style="font-size:24px">&#xf07a;</i>
            <span class='badge badge-warning' id='lblCartCount'> 5 </span>
          </a>
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <flash-message class="myCustomClass"></flash-message>
  </div>
</template>

<script>
  import axios from 'axios'
  import API from '../api'

  export default {
    data() {
      return {
        categories:'',
        wnWidth:window.screen.width
      }
    },
    created() {
      API().get('admin/categories')
      .then(res => {
        this.categories = res.data;
        if(this.wnWidth>1024){
          document.querySelector('.mobileCart').classList.add('display-none');
        }
        if(this.wnWidth<1024){
          document.querySelector('.navbar-dropdown').classList.add('display-none');
          document.querySelector('.desktopCart').classList.add('display-none');
        }
      })
      .catch(error=>{
        console.log(error);
      });
    },
    methods: {
      toggleClass() {
        document.querySelector('.navbar-burger').classList.toggle('is-active');
        document.querySelector('.navbar-menu').classList.toggle('is-active');
      },
      toggleDropdown(){
        document.querySelector('.navbar-dropdown').classList.toggle('display-none');
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";

  #brand {
    padding: 0;
    padding-left: 1em;
  }
  #brand:hover{
    transform: scale(1.1);
  }
  .display-none{
    display:none !important;
  }
  #lblCartCount {
    font-size: 12px;
    background: #ff0000;
    color: #fff;
    padding: 0 5px;
    vertical-align: top;
    margin-left: -5px;
  }
  .badge {
    padding-left: 9px;
    padding-right: 9px;
    -webkit-border-radius: 9px;
    -moz-border-radius: 9px;
    border-radius: 9px;
  }

  .label-warning[href],
  .badge-warning[href] {
    background-color: #c67605;
  }

  .navbar-burger{
    margin-left: 0 !important;
  }

  .mobileCart{
    margin-left: auto;
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
