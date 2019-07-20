<template>
  <section>
    <div class="block">
      <h1 class="title is-3">Register Details</h1>
    </div>
    <div class="formInput">
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input" v-model="username" type="text" placeholder="Username" disabled>
        </div>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" v-model="email" type="email" placeholder="Email" disabled>
        </div>
      </div>
      <div class="field">
        <label class="label">Mobile No.</label>
        <p class="control has-icons-left">
          <input class="input" v-model="mobile" type="tel" placeholder="Mobile No." pattern="[0-9]{10}">
          <span class="icon is-small is-left">+91</span>
        </p>
      </div>
      <div class="field">
        <label class="label">Address</label>
        <textarea id="" cols="30" rows="4" class="textarea" v-model="address" placeholder="Address"></textarea>
      </div>
      <div class="field">
        <label class="label">PIN Code</label>
        <input type="number" class="input" v-model="pinCode" placeholder="PIN Code">
      </div>
      <div class="control">
        <button class="button is-primary" @click="registerDetails">Submit</button>
      </div>
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
      registerDetails() {

      }
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
