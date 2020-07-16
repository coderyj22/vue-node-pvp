import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './rem'
import 'normalize.css/normalize.css'
import './style.scss'
import 'swiper/swiper.scss'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
