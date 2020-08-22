import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuelidate from 'vuelidate'
import Axios from 'axios';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './custom.scss';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Token ${token}`
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
