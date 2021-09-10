import Vue, { VNode } from 'vue';
import Dev from './serve-image-chat.vue';
import Router from 'vue-router';

Vue.config.productionTip = false;

const routes = [
  {
    path: '/demo',
    component: Dev
  }
];

const router = new Router({
  routes
});

Vue.use(Router);

new Vue({
  router,
  render: (h): VNode => h(Dev),
}).$mount('#app');
