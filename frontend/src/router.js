import Vue from 'vue'
import vueRouter from 'vue-router'
// main views
import admin from './views/admin.vue'
import user from './views/user.vue'
//user components
import Header from './components/header.vue'
import Footer from './components/footer.vue'
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
import adminHeader from './components/admin/adminHeader.vue'
import adminFooter from './components/admin/adminFooter.vue'
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
    name:"User",
    component:user
  },
  {
    path:'/admin',
    name:"Admin",
    component:admin
  }
];

export default new vueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:routes
});
