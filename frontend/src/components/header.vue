<template>
  <div class="header">
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a id="brand" class="navbar-item" href="/">
          <img src="../assets/logo2.png" width="112" height="52">
        </a>
          <a class="navbar-item is-right mobileCart" href="/cart">
            <i class="fa" style="font-size:24px">&#xf07a;</i>
            <span class='badge badge-warning' id='lblCartCount'> {{$store.state.cartCount}} </span>
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
          <p class="navbar-item mobileHello" v-if="this.$store.state.loginUsername && wnWidth<1024"><strong>Hi, {{$store.state.loginUsername}}</strong></p>

          <a class="navbar-item" href="/">
            Home
          </a>
          <div class="navbar-item has-dropdown is-hoverable" @click="toggleDropdown">
            <a class="navbar-link">
              Products
            </a>

            <div class="navbar-dropdown">
              <router-link :to="{name:'allProduct'}" class="navbar-item" tag="a">
                All Products
              </router-link>
              <router-link :to="{name:'catProduct',params:{category:category.slug}}" tag="a" class="navbar-item" v-for="category in categories" :key="category._id">
                {{category.title}}
              </router-link >
            </div>
          </div>

          <a class="navbar-item" v-if="this.$store.state.loginUsername" href="/my-profile">
            My Profie
          </a>
          <a class="navbar-item" v-if="this.$store.state.loginUsername" href="/my-orders">
            My Orders
          </a>
        </div>

        <div class="navbar-end">
          <p class="navbar-item desktopHello" v-if="this.$store.state.loginUsername && wnWidth>1024"><strong>Hi, {{$store.state.loginUsername}}</strong></p>
          <a class="navbar-item desktopCart" href="/cart">
            <i class="fa" style="font-size:24px">&#xf07a;</i>
            <span class='badge badge-warning' id='lblCartCount'>{{$store.state.cartCount}}</span>
          </a>
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary" v-if="!this.$store.state.loginUsername" href="/register">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light" v-if="!this.$store.state.loginUsername" href="/login">
                Log in
              </a>
              <a class="button is-primary" v-if="this.$store.state.isAdmin==1" target="_blank" href="/admin">
                Admin Area
              </a>
              <a class="button is-danger" v-if="this.$store.state.loginUsername" @click="logout">
                Logout
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
      API().get('category')
      .then(res => {
        this.categories = res.data;
      })
      .catch(error=>{
        console.log(error);
      });
    },
    mounted(){
      if(this.wnWidth>1024){
        document.querySelector('.mobileCart').classList.add('display-none');
      }
      if(this.wnWidth<1024){
        document.querySelector('.navbar-dropdown').classList.add('display-none');
        document.querySelector('.desktopCart').classList.add('display-none');
      }
    },
    methods: {
      toggleClass() {
        document.querySelector('.navbar-burger').classList.toggle('is-active');
        document.querySelector('.navbar-menu').classList.toggle('is-active');
      },
      toggleDropdown(){
        document.querySelector('.navbar-dropdown').classList.toggle('display-none');
      },
      logout(){
        this.$store.commit('logout');
        this.$router.push({name:'Login'});
        this.flash('Logged out successfully!!','success');
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
  .myCustomClass{
    margin-top: 4em;
  }
  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
