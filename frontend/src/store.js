import Vue from 'vue'
import Vuex from 'vuex'
import createMutationsSharer from "vuex-shared-mutations";
import API from './api'

Vue.use(Vuex);
// window.localStorage.clear();
let cart = window.localStorage.getItem('cart');
let cartCount = window.localStorage.getItem('cartCount');
let loginUsername=window.localStorage.getItem('loginUsername');
let loginToken=window.localStorage.getItem('loginToken');
let isAdmin=window.localStorage.getItem('isAdmin');
// let loginTokenExpirationTime=window.localStorage.getItem('loginTokenExpirationTime');

export default new Vuex.Store({
  state: {
    cart:cart?JSON.parse(cart) :[],
    cartCount:cartCount?cartCount:0,
    registerToken:null,
    registerUsername:null,
    registerEmail:null,
    loginToken:loginToken?loginToken:null,
    loginUsername:loginUsername?loginUsername:null,
    // loginTokenExpirationTime:loginTokenExpirationTime?loginTokenExpirationTime:null,
    isAdmin:isAdmin?isAdmin:0
  },
  mutations: {
    addToCart(state,item){
      let found = state.cart.find(product => product.id == item.id);
      if(found){
        if(found.qty+item.qty<=10){
          found.qty=found.qty+item.qty;
          state.cartCount=state.cartCount+item.qty;
          this.commit('saveCart');
        }else{
          alert('Maximum allowed quantity is 10');
        }
      }
      else{
        state.cart.push(item);
        state.cartCount=parseInt(state.cartCount)+parseInt(item.qty);
        this.commit('saveCart');
      }
    },
    removeProduct(state,item){
      for(let i=0;i<state.cart.length;i++){
        if(state.cart[i].id==item.id){
          let product=state.cart[i];
          state.cartCount-=product.qty;
          state.cart.splice(i,1);
          this.commit('saveCart');
        }
      }
    },
    incQty(state,id){
      for(let i=0;i<state.cart.length;i++){
        if(state.cart[i].id==id){
          state.cart[i].qty++;
          state.cartCount++;
          this.commit('saveCart');
        }
      }
    },
    decQty(state,id){
      for(let i=0;i<state.cart.length;i++){
        if(state.cart[i].id==id){
          state.cart[i].qty--;
          state.cartCount--;
          this.commit('saveCart');
        }
      }
    },
    saveCart(state){
      window.localStorage.setItem('cart', JSON.stringify(state.cart));
      window.localStorage.setItem('cartCount', state.cartCount);
      var auth='Bearer '+ state.loginToken;
      var axiosConfig={
        headers:{
          'Authorization':auth
        }
      };
      API().post('sync-cart',{
        username:state.loginUsername,
        cart:state.cart,
        cartCount:state.cartCount
      },axiosConfig)
      .then(res=>{

      })
      .catch(error=>{
        console.log(error)
      });
    },
    removeRegister(state){
      state.registerEmail=null;
      state.registerToken=null;
      state.registerUsername=null;
    },
    login(state,user){
      //window.localStorage.clear();
      state.loginToken=user.token;
      state.loginUsername=user.username;
      state.isAdmin=user.admin;
      state.cart=user.cart;
      state.cartCount=user.cartCount;
      // const now = new Date();
      // const expirationTime=new Date(now.getTime() + 86340000); //86340000 is 1 min less than 24 hours
      // state.loginTokenExpirationTime=expirationTime;
      window.localStorage.setItem('loginToken',state.loginToken);
      window.localStorage.setItem('loginUsername',state.loginUsername);
      window.localStorage.setItem('isAdmin',state.isAdmin);
      this.commit('saveCart');
      // window.localStorage.setItem('loginTokenExpirationTime',state.loginTokenExpirationTime);
    },
    logout(state){
      state.loginToken=null;
      state.loginUsername=null;
      // state.loginTokenExpirationTime=null;
      state.isAdmin=0;
      window.localStorage.clear();
    },
    clearCart(state){
      window.localStorage.removeItem('cart');
      window.localStorage.removeItem('cartCount');
      var auth='Bearer '+ state.loginToken;
      var axiosConfig={
        headers:{
          'Authorization':auth
        }
      };
      API().post('sync-cart/clear',{
        username:state.loginUsername
      },axiosConfig)
      .then(res=>{

      })
      .catch(error=>{
        console.log(error)
      });
    }
    // autoLogout(state){
    //   const token=window.localStorage.getItem('loginToken');
    //   if(!token){
    //     return
    //   }
    //   const expirationTime=window.localStorage.getItem('loginTokenExpirationTime');
    //   const now =new Date();
    //   if(now>=expirationTime){
    //     console.log('hi');
    //     this.commit('logout');
    //   }
    // }
  },
  plugins: [createMutationsSharer({ predicate: ['addToCart','incQty','decQty','removeProduct', 'saveCart','clearCart'] })]
})
