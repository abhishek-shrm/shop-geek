<template>
  <section>
    <div class="block">
      <h1 class="title is-1">About Us</h1>
    </div>
    <div class="box">
      <h2 class="title is-5">
        We bring IT products to you at lowest prices.
      </h2>
      <h2 class="title is-5">
        We have 1000+ &#x1F601; customers.
      </h2>
    </div> 
  </section>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";

  .block{
    background: url("../../public/images/about.jpg") no-repeat center center;
    background-size:cover;
    margin-top: 1em;
    h1{
      padding-top:3em;
      padding-bottom: 1em;
      text-align: center;
      color:white;
    }
  }
  .box{
    z-index: 10;
    margin-left: 1em;
    margin-right: 1em;
    margin-top: 0;
    margin-bottom: 2em;
    text-align: center;
  }

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
