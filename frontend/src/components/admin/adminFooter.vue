<template>
  <div class="block">
    <footer class="footer">
      <div class="content has-text-centered">
        <div class="columns">
          <div class="column is-4">
            <a href="/about-us" target="_blank" style="color:#3FE0D0">About Us</a>
          </div>
          <div class="column is-4">
            <a href="/careers" target="_blank" style="color:#3FE0D0">Careers</a>
          </div>
          <div class="column is-4">
            <a href="/contact" target="_blank" style="color:#3FE0D0">Contact Us</a>
          </div>
        </div>
        <div class="icons">
          <a href="#" class="icon"><i class="fa fa-facebook-square"></i></a>
          <a href="#" class="icon" style="color:red"><i class="fa fa-google-plus-square"></i></a>
          <a href="#" class="icon"><i class="fa fa-twitter-square"></i></a>
          <a href="#" class="icon"><i class="fa fa-telegram"></i></a>
        </div>
        <p style="margin-top:1.5em">&copy; SHOP GEEK-2019</p>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {

  }

</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";

  $footer-background-color: #F5F5F5;
  $footer-padding:3rem 1.5rem 3rem;

  a.icon{
    margin-left: 20px;
    i{
      font-size: 2em;
    }
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
