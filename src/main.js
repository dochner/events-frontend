import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import { router } from './router';
import store from './store';


Vue.config.productionTip = false

Vue.use(VeeValidate);

Vue.use(Vuex);


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
