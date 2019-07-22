import Vue from 'vue'
import vueRouter from 'vue-router'
import store from './store'

Vue.use(vueRouter);

const routes=[
  {
    path:'/',
    component:()=>import('./views/user.vue'),
    children:[
      {
        path:'',
        name:"Home",
        component:()=>import('./components/home.vue')
      },
      {
        path:'about-us',
        name:"About",
        component:()=>import('./components/about.vue')
      },
      {
        path:'all-product',
        name:"allProduct",
        component:()=>import('./components/all_product.vue')
      },
      {
        path:'careers',
        name:"Career",
        component:()=>import('./components/career.vue')
      },
      {
        path:'cart',
        name:"cart",
        component:()=>import('./components/cart.vue'),
        beforeEnter: (to, from, next) => {
          if(store.state.loginToken){
            next();
          }else{
            next('/login');
          }
        }
      },
      {
        path:'cat-product/:category',
        name:"catProduct",
        component:()=>import('./components/cat_product.vue')
      },
      {
        path:'contact',
        name:"Contact",
        component:()=>import('./components/contact.vue')
      },
      {
        path:'product-page/:productName',
        name:"productPage",
        component:()=>import('./components/product_page.vue')
      },
      {
        path:'login',
        name:"Login",
        component:()=>import('./components/login.vue')
      },
      {
        path:'register',
        name:"Register",
        component:()=>import('./components/register.vue')
      },
      {
          path:'register/details',
          name:"registerDetails",
          component:()=>import('./components/registerDetails.vue'),
          beforeEnter: (to, from, next) => {
            if(store.state.registerToken){
              next();
            }else{
              next('/register');
            }
          }
      },
      {
        path:'my-profile',
        name:"myProfile",
        component:()=>import('./components/my-profile.vue'),
        beforeEnter: (to, from, next) => {
          if(store.state.loginToken){
            next();
          }else{
            next('/login');
          }
        }
      },
      {
        path:'edit-my-profile',
        name:"editMyProfile",
        component:()=>import('./components/edit-my-profile.vue'),
        beforeEnter: (to, from, next) => {
          if(store.state.loginToken){
            next();
          }else{
            next('/login');
          }
        }
      },
      {
        path:'payment-page',
        name:"paymentPage",
        component:()=>import('./components/payment.vue'),
        beforeEnter: (to, from, next) => {
          if(store.state.loginToken && (store.state.cart!=[]) && (from.name=='cart')){
            next();
          }
          else if(store.state.loginToken && (store.state.cart!=[]) && (from.name!='cart')){
            next('/');
          }else{
            next('/login');
          }
        }
      },
      {
        path:'my-orders',
        name:'myOrders',
        component:()=>import('./components/my-orders.vue'),
        beforeEnter: (to, from, next) => {
          if(store.state.loginToken){
            next();
          }else{
            next('/login');
          }
        }
      }
    ]
  },
  {
    path:'/admin',
    component:()=>import('./views/admin.vue'),
    children:[
      {
        path:'',
        name:"adminHome",
        component:()=>import('./components/admin/adminHome.vue'),
        beforeEnter: (to, from, next) => {
          if(store.state.loginToken && (store.state.isAdmin==1)){
            next();
          }else{
            next('/');
          }
        }
      },
      {
        path:'products',
        name:"productPanel",
        component:()=>import('./components/admin/product_panel.vue'),
        beforeEnter: (to, from, next) => {
          if(store.state.loginToken && (store.state.isAdmin==1)){
            next();
          }else{
            next('/');
          }
        }
      },
      {
        path:'categories',
        name:"categoryPanel",
        component:()=>import('./components/admin/category_panel.vue'),
        beforeEnter: (to, from, next) => {
          if(store.state.loginToken && (store.state.isAdmin==1)){
            next();
          }else{
            next('/');
          }
        }
      },
      {
        path:'add-product',
        name:"addProduct",
        component:()=>import('./components/admin/add_product.vue'),
        beforeEnter: (to, from, next) => {
          if(store.state.loginToken && (store.state.isAdmin==1)){
            next();
          }else{
            next('/');
          }
        }
      },
      {
        path:'edit-product/:id',
        name:"editProduct",
        component:()=>import('./components/admin/edit_product.vue'),
        beforeEnter: (to, from, next) => {
          if(store.state.loginToken && (store.state.isAdmin==1)){
            next();
          }else{
            next('/');
          }
        }
      },
      {
        path:'add-category',
        name:"addCategory",
        component:()=>import('./components/admin/add_category.vue'),
        beforeEnter: (to, from, next) => {
          if(store.state.loginToken && (store.state.isAdmin==1)){
            next();
          }else{
            next('/');
          }
        }
      },
      {
        path:'edit-category/:id',
        name:"editCategory",
        component:()=>import('./components/admin/edit_category.vue'),
        beforeEnter: (to, from, next) => {
          if(store.state.loginToken && (store.state.isAdmin==1)){
            next();
          }else{
            next('/');
          }
        }
      }
    ]
  }
];

export default new vueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:routes
});
