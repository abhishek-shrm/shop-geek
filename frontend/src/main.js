import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueFlashMessage from 'vue-flash-message';
Vue.use(VueFlashMessage);
require('vue-flash-message/dist/vue-flash-message.min.css');
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use(Buefy);
Vue.use( CKEditor );

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
