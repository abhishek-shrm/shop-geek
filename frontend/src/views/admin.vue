<template>
  <div class="block">
      <adminHeader></adminHeader>
        <router-view></router-view>
      <adminFooter></adminFooter>
  </div>  
</template>

<script>

import adminHeader from '../components/admin/adminHeader'
import adminFooter from '../components/admin/adminFooter'

export default {

  components:{
    adminHeader,
    adminFooter
  }
  
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
