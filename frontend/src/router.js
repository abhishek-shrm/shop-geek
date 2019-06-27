import Vue from 'vue'
import vueRouter from 'vue-router'

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
        path:'checkout',
        name:"Checkout",
        component:()=>import('./components/checkout.vue')
      },
      {
        path:'cat-product',
        name:"catProduct",
        component:()=>import('./components/cat_product.vue')
      },
      {
        path:'contact',
        name:"Contact",
        component:()=>import('./components/contact.vue')
      },
      {
        path:'product-page',
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
        component:()=>import('./components/admin/adminHome.vue')
      },
      {
        path:'products',
        name:"productPanel",
        component:()=>import('./components/admin/product_panel.vue')
      },
      {
        path:'categories',
        name:"categoryPanel",
        component:()=>import('./components/admin/category_panel.vue')
      },
      {
        path:'add-product',
        name:"addProduct",
        component:()=>import('./components/admin/add_product.vue')
      },
      {
        path:'edit-product',
        name:"editProduct",
        component:()=>import('./components/admin/edit_product.vue')
      },
      {
        path:'add-category',
        name:"addCategory",
        component:()=>import('./components/admin/add_category.vue')
      },
      {
        path:'edit-category/:id',
        name:"editCategory",
        component:()=>import('./components/admin/edit_category.vue')
      }
    ]
  }
];

export default new vueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:routes
});
