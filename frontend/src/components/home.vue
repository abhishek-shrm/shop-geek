<template>
  <section>

    <carousel :per-page="1" :paginationEnabled="false" :autoplay="true" :loop="true">
      <slide>
        <img src="../../public/images/carousel/1.jpg" alt="">
      </slide>
      <slide>
        <img src="../../public/images/carousel/2.jpg" alt="">
      </slide>
      <slide>
        <img src="../../public/images/carousel/3.jpg" alt="">
      </slide>
    </carousel>

    <div class="columns is-1" id="features">
      <div class="column">
        <div class="card">
          <div class="card-image">
            <img src="../../public/images/cards/1.jpg" id="cardImage">
          </div>
          <div class="card-content">
            <p class="title is-5">We bring High-quality IT products to you at the lowest prices.</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-image">
            <img src="../../public/images/cards/2.jpg" id="cardImage">
          </div>
          <div class="card-content">
            <p class="title is-5">We deliver your order in 48-hours across whole Delhi-NCR.</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-image">
            <img src="../../public/images/cards/3.jpg" id="cardImage">
          </div>
          <div class="card-content">
            <p class="title is-5">We provide 24x7 customer support for your queries.</p>
          </div>
        </div>
      </div>
    </div>

    <ul class="steps is-medium is-centered has-content-centered is-horizontal">
      <li class="steps-segment">
        <span class="steps-marker">
          <span class="icon">
            <i class="fa fa-shopping-cart"></i>
          </span>
        </span>
        <div class="steps-content">
          <p class="heading">Choose Product</p>
        </div>
      </li>
      <li class="steps-segment">
        <span class="steps-marker">
          <span class="icon">
            <i class="fa fa-user"></i>
          </span>
        </span>
        <div class="steps-content">
          <p class="heading">Verify Details</p>
        </div>
      </li>
      <li class="steps-segment">
        <span class="steps-marker">
          <span class="icon">
            <i class="fa fa-inr"></i>
          </span>
        </span>
        <div class="steps-content">
          <p class="heading">Payment</p>
        </div>
      </li>
      <li class="steps-segment">
        <span class="steps-marker">
          <span class="icon">
            <i class="fa fa-truck"></i>
          </span>
        </span>
        <div class="steps-content">
          <p class="heading">Get Product</p>
        </div>
      </li>
    </ul>

    <carousel :per-page="1" :paginationEnabled="false" :autoplay="true" :loop="true" id="featureImages">
      <slide>
        <img src="../../public/images/carousel/4.jpg" alt="">
      </slide>
      <slide>
        <img src="../../public/images/carousel/5.jpg" alt="">
      </slide>
      <slide>
        <img src="../../public/images/carousel/6.jpg" alt="">
      </slide>
    </carousel>
  </section>
</template>

<script>
  export default {

  }

</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";

  $card-shadow:0 5px 5px rgba($black, 0.1),
  0 0 0 1px rgba($black, 0.1);

  .steps-segment:after {
    background-color: #57e3ad;
  }
  .steps-marker {
    background-color: #57e3ad !important;
  }

  section {
    margin-top: 4em;
    text-align: center;
  }

  .steps {
    margin-top: 2em;
    margin-bottom: 2em;
  }

  .featureImages {
    margin-top: 2em;
  }

  #cardImage {
    width: 100%;
    height: 256px;
  }

  .columns {
    margin-top: 2em;
    text-align: center;
  }

  .card {
    width: 300px;
    margin-bottom: 1em;
    border-radius: 25px 25px;
    display: inline-block;
    margin-left: 1em;

    .card-image {
      img {
        border-radius: 25px 25px 0 0;
      }
    }
  }

  #features{
    margin-top: 2em;;
  }
  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
