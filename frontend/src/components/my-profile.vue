<template>
  <section>
    <div class="block">
      <h1 class="title is-3">My Profile</h1>
    </div>
    <div class="buttons is-centered">
      <router-link :to="{name:'editMyProfile'}" class="button is-primary">
        Edit Profile
      </router-link>
    </div>
    <div class="formInput">
      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" v-model="firstName" type="text" placeholder="First Name" disabled>
        </div>
      </div>
      <div class="field">
        <label class="label">Last Name</label>
        <div class="control">
          <input class="input" v-model="lastName" type="text" placeholder="Last Name" disabled>
        </div>
      </div>
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
          <input class="input" v-model="mobile" type="tel" placeholder="Mobile No." pattern="[0-9]{10}" disabled>
          <span class="icon is-small is-left">+91</span>
        </p>
      </div>
      <div class="field">
        <label class="label">Address</label>
        <textarea id="" cols="30" rows="4" class="textarea" v-model="address" placeholder="Address" disabled></textarea>
      </div>
      <div class="field">
        <label class="label">City</label>
        <div class="control">
          <input class="input" v-model="city" type="text" placeholder="City" disabled>
        </div>
      </div>
      <div class="field">
        <label class="label">State</label>
        <div class="control">
          <input class="input" v-model="state" type="text" placeholder="State" disabled>
        </div>
      </div>
      <div class="field">
        <label class="label">PIN Code</label>
        <input type="number" class="input" v-model="pinCode" placeholder="PIN Code" disabled>
      </div>
    </div>
  </section>
</template>

<script>
  import API from '../api'

  export default {
    data() {
      return {
        firstName:'',
        lastName:'',
        username: '',
        email: '',
        mobile: '',
        address: '',
        pinCode: '',
        auth:'',
        city:'',
        state:'',
        auth:'',
        axiosConfig:''
      }
    },
    created(){
      this.auth='Bearer '+ this.$store.state.loginToken;
      this.axiosConfig={
        headers:{
          'Authorization':this.auth
        }
      };
      API().post('my-profile',{
        username:this.$store.state.loginUsername
      },this.axiosConfig)
      .then(res=>{
        this.username=res.data.username;
        this.firstName=res.data.firstName;
        this.lastName=res.data.lastName;
        this.email=res.data.email;
        this.address=res.data.address;
        this.pinCode=res.data.pinCode;
        this.mobile=res.data.mobile;
        this.city=res.data.city;
        this.state=res.data.state;
      })
      .catch(error=>{
        console.log(error);
      });
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
