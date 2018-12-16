import Vue from 'vue'
import App from './App.vue'

import  store  from './store/index.js';
import { router } from './routes/index.js';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
