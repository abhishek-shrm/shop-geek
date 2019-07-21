<template>
  <div class="adminHeader">
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a id="brand" class="navbar-item" href="/" target="_blank">
          <img src="../../assets/logo2.png" width="112" height="52">
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
          <a class="navbar-item" href="/admin">
            Home
          </a>

          <a class="navbar-item" href="/admin/categories">
            Categories
          </a>

          <a class="navbar-item" href="/admin/products">
            Products
          </a>
        </div>

        <div class="navbar-end">
          <p class="navbar-item desktopHello" v-if="this.$store.state.loginUsername && wnWidth>1024"><strong>Hi, {{$store.state.loginUsername}}</strong></p>
          <div class="navbar-item">
            <div class="buttons">
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
  export default {

    data() {
      return {
        wnWidth:window.screen.width
      }
    },
    created(){

    },
    methods: {
      toggleClass() {
        document.querySelector('.navbar-burger').classList.toggle('is-active');
        document.querySelector('.navbar-menu').classList.toggle('is-active');
      },
      toggleDrop() {

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
  .myCustomClass{
    margin-top: 4em;
  }
  .display-none{
    display:none !important;
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
