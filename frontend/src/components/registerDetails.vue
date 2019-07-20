<template>
  <section>
    <div class="block">
      <h1 class="title is-3">Register Details</h1>
    </div>
    <div class="formInput">
      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" v-model="firstName" type="text" placeholder="First Name">
        </div>
      </div>
      <div class="field">
        <label class="label">Last Name</label>
        <div class="control">
          <input class="input" v-model="lastName" type="text" placeholder="Last Name">
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
          <input class="input" v-model="mobile" type="tel" placeholder="Mobile No." pattern="[0-9]{10}">
          <span class="icon is-small is-left">+91</span>
        </p>
      </div>
      <div class="field">
        <label class="label">Address</label>
        <textarea id="" cols="30" rows="4" class="textarea" v-model="address" placeholder="Address"></textarea>
      </div>
      <div class="field">
        <label class="label">City</label>
        <div class="control">
          <input class="input" v-model="city" type="text" placeholder="City">
        </div>
      </div>
      <div class="field">
        <label class="label">State</label>
        <div class="control">
          <input class="input" v-model="state" type="text" placeholder="State">
        </div>
      </div>
      <div class="field">
        <label class="label">PIN Code</label>
        <input type="number" class="input" v-model="pinCode" placeholder="PIN Code">
      </div>
      <div class="control">
        <button class="button is-primary" :disabled="isDisabled" @click="registerDetails">Submit</button>
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
        state:''
      }
    },
    created(){
      this.username=this.$store.state.registerUsername;
      this.email=this.$store.state.registerEmail;
      this.auth='Bearer '+ this.$store.state.registerToken;
    },
    methods: {
      registerDetails() {
        var userDetails={
          firstName:this.firstName,
          lastName:this.lastName,
          username:this.username,
          email:this.email,
          mobile:this.mobile,
          address:this.address,
          city:this.city,
          state:this.state,
          pinCode:this.pinCode
        };
        var axiosConfig={
          headers:{
            'Authorization':this.auth
          }
        };
        API().post('register/details',userDetails,axiosConfig)
        .then(res=>{
          if(res.data.errors){
            if(res.data.errors[0].msg){
              this.flash(res.data.errors[0].msg,'error');
            }else if(res.data.errors){
              this.flash(res.data.errors,'error');
            }
          }else if(res.data.success){
            this.$router.push({name:'Login'});
            this.flash(res.data.success,'success');
            this.$store.commit('removeRegister');
          }
        })
        .catch(error=>{
          console.log(error);
        });
      }
    },
    computed:{
      isDisabled(){
        return this.mobile.length<10 || this.address.length<2 || this.pinCode.length<6;
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";

  .block>h1 {
    margin-top: 1em;
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
