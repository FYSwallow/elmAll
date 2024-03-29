import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './assets/font-awesome/css/font-awesome.min.css'
import store from './store/index'
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
