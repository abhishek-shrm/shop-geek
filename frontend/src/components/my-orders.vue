<template>
  <section>
    <div class="block">
      <h1 class="title is-3">My Orders</h1>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        mobile: '',
        address: '',
        pinCode: ''
      }
    },
    methods: {

    }
  }

</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";

  .block>h1 {
    margin-top: 2em;
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
