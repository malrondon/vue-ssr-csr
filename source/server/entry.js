import { createApp } from "../shared/app";

export default context =>
  new Promise((resolve, reject) => {  // eslint-disable-line
    const { app, router, store } = createApp();
    const meta = app.$meta();

    router.push(context.url);
    context.meta = meta;

    router.onReady(() => {
      context.rendered = () => {
        context.state = store.state;
      };

      const matchedComponents = router.getMatchedComponents();

      if (!matchedComponents.length) {
        return reject(new Error(404));
      }

      return resolve(app);
    }, reject);
  });
