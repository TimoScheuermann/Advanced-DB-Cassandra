import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

var vm = new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')

vm.data = {
  teams: [
    "Adler Mannheim",
    "Redbull München",
    "Eisbären Berlin",
    "Kölner Haie",
    "Schwenninger Wildwings",
    "Huskies Kassel"
  ]
}