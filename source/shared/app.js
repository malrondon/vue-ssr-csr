import Vue from 'vue';
import Vuex from 'vuex';
import Meta from 'vue-meta';
import VueI18n from 'vue-i18n';
import { sync } from 'vuex-router-sync';
import config from './config';

import createStore from './store';
import { createRouter } from './router';

import App from './App.vue';

Vue.use(Vuex);
Vue.use(Meta, {
  ssrAppId: 1, // https://vue-meta.nuxtjs.org/guide/caveats.html#duplicated-tags-after-hydration-with-ssr
});
Vue.use(VueI18n);

const messages = {
  main: require(`../../languages/${config.LANGUAGE_MAIN_FILENAME}.json`),
};

export const createApp = context => {
  const i18n = new VueI18n({
    locale: 'main',
    messages,
  });

  const store = createStore(context.state);
  const router = createRouter();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  });

  return { app, router, store };
};
