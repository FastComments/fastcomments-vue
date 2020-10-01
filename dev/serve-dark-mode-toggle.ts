import Vue, { VNode } from 'vue';
import Dev from './serve-dark-mode-toggle.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h): VNode => h(Dev),
}).$mount('#app');
