import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/home.vue';
import NotFound from '../views/not-found.vue';

Vue.use(Router);

const routes = [{ name: 'home', path: '/', component: Home }];

routes.push({ path: '*', component: NotFound });

export function createRouter() {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes,
  });
}
