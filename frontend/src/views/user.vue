<template>
  <div class="block">
      <h1 class="title is-1">User</h1>
      <Header></Header>
        <router-view></router-view>
      <Footer></Footer>
  </div>  
</template>

<script>

import Header from '../components/header'
import Footer from '../components/footer'

export default {
  components:{
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";



@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
