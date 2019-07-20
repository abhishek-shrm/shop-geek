<template>
  <section>
    <div class="block">
      <h1 class="title is-3">Register</h1>
    </div>
    <div class="formInput">
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input" v-model="username" type="text" placeholder="Username">
        </div>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" v-model="email" type="email" placeholder="Email">
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" v-model="password" type="password" placeholder="Password">
        </div>
      </div>
      <div class="field">
        <label class="label">Confirm Password</label>
        <p class="control has-icons-right">
          <input class="input" v-model="confirmPassword" type="password" placeholder="Confirm Password">
          <span v-if="(password!==confirmPassword) && password.length" class="icon is-small is-right" style="color:red">
            <i class="fa fa-times"></i>
          </span>
          <span v-if="(password==confirmPassword) && password.length" class="icon is-small is-right" style="color:green">
            <i class="fa fa-check"></i>
          </span>
        </p>
      </div>
      <div class="control">
        <button class="button is-primary" @click="registerUser">Register</button>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
      }
    },
    methods: {
      registerUser() {

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
