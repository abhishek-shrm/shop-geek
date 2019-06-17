<template>
  <div class="block">
    <h1 class="title is-1">Welcome to Admin Area</h1>
    <section class="card">
      <ul>
        <li><span></span><strong>You can Add,
            Edit and Delete Categories</strong></li>
        <li><span></span><strong>You can Add,
            Edit and Delete Products</strong></li>
      </ul>
    </section>
  </div>
</template>


<script>
export default {


}
</script>


<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";

  .block h1 {
    margin-top: 2em;
  }

  section.card {
    margin: 1em;
    padding: 20px;
    border-radius: 15px;
    align-self: center;

    ul {

      list-style-type: none;
      margin: 0;
      padding: 0;

      span {
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: lighten(#3FE0D0, 30%);
        border-radius: 50%;
        margin-right: 10px;
      }

      strong {
        display: inline-block;
        margin-left: max(40px);
        font-size: 1.3em;
      }
    }
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
