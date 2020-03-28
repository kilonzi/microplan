import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'sanitize.css'
import 'semantic-ui-icon/icon.css'
import 'wenk/dist/wenk.css'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: function(h) { return h(App) }
}).$mount('#app')