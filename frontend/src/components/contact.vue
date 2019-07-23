<template>
  <section>
    <div class="block">
      <h1 class="title is-1">Contact Us</h1>
    </div>
      <div class="box">
        <div class="columns">
          <div class="column left-text">
            <h2 class="title is-5">Address: <span>New Delhi, India</span></h2>
            <h2 class="title is-5">Phone: <span>+91 9013365032</span></h2>
            <h2 class="title is-5">E-mail: <span >support@shop-geek</span></h2>
          </div>
          <div class="column">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.61368048817!2d77.06889969034492!3d28.52721814399746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew+Delhi%2C+Delhi!5e0!3m2!1sen!2sin!4v1563872414469!5m2!1sen!2sin" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
          </div>
        </div>
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
    background: url("../../public/images/contact.jpg") no-repeat center center;
    background-size:cover;
    margin-top: 1em;
    h1{
      padding-top:3em;
      padding-bottom: 1em;
      text-align: center;
      color:white;
    }
  }

  .label {
    margin-left: 0.5em;
  }
  .box{
    z-index: 10;
    margin-left: 1em;
    margin-right: 1em;
    margin-top: 0;
    margin-bottom: 2em;
    span{
      color:#ccc !important;
    }
  }

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
