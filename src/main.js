import Vue from 'vue'
import VueProgressBar from 'vue-progressbar';
import App from './App.vue'

import  store  from './store/index.js';
import { router } from './routes/index.js';
import BootstrapVue from 'bootstrap-vue'
import BackToTop from 'vue-backtotop';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

const options = {
  color : '#42a4f4',
  failedColor: '#cc161c',
  thickness: '5px',
  transition: {
    speed: '0.6s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false,
}

Vue.use(BootstrapVue);
Vue.use(VueProgressBar, options);
Vue.use(BackToTop);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
