import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart:[],
    cartCount:0
  },
  mutations: {
    addToCart(state,item){
      let found = state.cart.find(product => product.id == item.id);
      if(found){
        if(found.qty+item.qty<=10){
          found.qty=found.qty+item.qty;
          state.cartCount=state.cartCount+item.qty;
        }else{
          alert('Maximum allowed quantity is 10');
        }
      }
      else{
        state.cart.push(item);
        state.cartCount=state.cartCount+item.qty;
      }
      console.log(state);
    }
  },
  actions: {

  }
})
