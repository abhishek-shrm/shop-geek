import Vue from 'vue'
import Vuex from 'vuex'
import createMutationsSharer from "vuex-shared-mutations";

Vue.use(Vuex);
// window.localStorage.clear();
let cart = window.localStorage.getItem('cart');
let cartCount = window.localStorage.getItem('cartCount');
let loginUsername=window.localStorage.getItem('loginUsername');
let loginToken=window.localStorage.getItem('loginToken');
let isAdmin=window.localStorage.getItem('isAdmin');

export default new Vuex.Store({
  state: {
    cart:cart?JSON.parse(cart) :[],
    cartCount:cartCount?cartCount:0,
    registerToken:null,
    registerUsername:null,
    registerEmail:null,
    loginToken:loginToken?loginToken:null,
    loginUsername:loginUsername?loginUsername:null,
    loginTokenTime:null,
    isAdmin:isAdmin?isAdmin:null
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
      window.localStorage.setItem('loginToken',state.registerToken);
      window.localStorage.setItem('loginUsername',state.loginUsername);
      window.localStorage.setItem('isAdmin',state.isAdmin);
    },
    logout(state){
      state.loginToken=null;
      state.loginUsername=null;
      state.loginTokenTime=null;
      state.isAdmin=null;
      window.localStorage.clear();
    }
  },
  plugins: [createMutationsSharer({ predicate: ['addToCart','incQty','decQty','removeProduct', 'saveCart'] })]
})
