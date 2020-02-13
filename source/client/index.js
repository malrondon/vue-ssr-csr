import { createApp } from '../shared/app';

const { app, router } = createApp({ state: window.__INITIAL_STATE__ });

router.onReady(() => {
  app.$mount('#app');
});
