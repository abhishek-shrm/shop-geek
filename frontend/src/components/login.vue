<template>
  <section>
  <div class="block">
      <h1 class="title is-3">Login</h1>
  </div>
      <div class="formInput">
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input" v-model="username" type="text" placeholder="Username">
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" v-model="password" type="password" placeholder="Password">
        </div>
      </div>
      <div class="control">
        <button class="button is-info" :disabled="isDisabled"  @click="loginUser">Login</button>
      </div>
    </div>
  </section>  
</template>

<script>
import API from '../api'

export default {
  data(){
    return{
      username:'',
      password:''
    }
  },
  methods: {
    loginUser(){
      API().post('login',{
        username:this.username,
        password:this.password
      })
      .then(res=>{
        if(res.data.errors){
          this.flash(res.data.errors,'error');
        }else if(res.data.success){
          var user={
            username:res.data.username,
            token:res.data.token,
            admin:res.data.admin,
            cart:res.data.cart,
            cartCount:res.data.cartCount
          };
          this.$store.commit('login',user);
          this.$router.push({name:'Home'});
          this.flash(res.data.success,'success');
        }
      })
      .catch(error=>{
        console.log(error);
      });
    }
  },
  computed:{
    isDisabled(){
      return this.password.length<2 || this.username.length<2;
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
