import Vue from 'vue'
import vueRouter from 'vue-router'
// main views
import admin from './views/admin.vue'
import user from './views/user.vue'
//user components
import Login from './components/login.vue'
import Register from './components/register.vue'
import Home from './components/home.vue'
import Checkout from './components/checkout.vue'
import allProduct from './components/all_product.vue'
import Career from './components/career.vue'
import productPage from './components/product_page.vue'
import Contact from './components/contact.vue'
import catProduct from './components/cat_product.vue'
import About from './components/about.vue'
//admin components
import adminHome from './components/admin/adminHome.vue'
import productPanel from './components/admin/product_panel.vue'
import categoryPanel from './components/admin/category_panel.vue'
import addProduct from './components/admin/add_product.vue'
import addCategory from './components/admin/add_category.vue'
import editProduct from './components/admin/edit_product.vue'
import editCategory from './components/admin/edit_category.vue'

Vue.use(vueRouter);

const routes=[
  {
    path:'/',
    component:user,
    children:[
      {
        path:'',
        name:"Home",
        component:Home
      },
      {
        path:'about-us',
        name:"About",
        component:About
      },
      {
        path:'all-product',
        name:"allProduct",
        component:allProduct
      },
      {
        path:'careers',
        name:"Career",
        component:Career
      },
      {
        path:'checkout',
        name:"Checkout",
        component:Checkout
      },
      {
        path:'cat-product',
        name:"catProduct",
        component:catProduct
      },
      {
        path:'contact',
        name:"Contact",
        component:Contact
      },
      {
        path:'product-page',
        name:"productPage",
        component:productPage
      },
      {
        path:'login',
        name:"Login",
        component:Login
      },
      {
        path:'register',
        name:"Register",
        component:Register
      }
    ]
  },
  {
    path:'/admin',
    component:admin,
    children:[
      {
        path:'',
        name:"adminHome",
        component:adminHome
      },
      {
        path:'products',
        name:"productPanel",
        component:productPanel
      },
      {
        path:'categories',
        name:"categoryPanel",
        component:categoryPanel
      },
      {
        path:'add-product',
        name:"addProduct",
        component:addProduct
      },
      {
        path:'edit-product',
        name:"editProduct",
        component:editProduct
      },
      {
        path:'add-category',
        name:"addCategory",
        component:addCategory
      },
      {
        path:'edit-category',
        name:"editCategory",
        component:editCategory
      }
    ]
  }
];

export default new vueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:routes
});
