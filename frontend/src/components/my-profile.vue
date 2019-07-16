<template>
  <section>
    <div class="block">
      <h1 class="title is-3">My Profile</h1>
    </div>
    <div class="buttons is-centered">
      <router-link :to="{name:'editMyProfile',params:{username:username}}" class="button is-primary">
        Edit Profile
      </router-link>
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
          <input class="input" v-model="mobile" type="number" placeholder="Mobile No." disabled>
          <span class="icon is-small is-left">+91</span>
        </p>
      </div>
      <div class="field">
        <label class="label">Address</label>
        <textarea id="" cols="30" rows="4" class="textarea" v-model="address" placeholder="Address" disabled></textarea>
      </div>
      <div class="field">
        <label class="label">PIN Code</label>
        <input type="number" class="input" v-model="pinCode" placeholder="PIN Code" disabled>
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
