import Vue from "vue";
import "es6-promise/auto";
import { createApp } from "../shared/app";

Vue.mixin({
	beforeRouteUpdate(to, from, next) {
		const { asyncData } = this.$options
		if (asyncData) {
			asyncData({
				store: this.$store,
				route: to
			}).then(next).catch(next)
		} else {
			next()
		}
	}
});

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
	store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
	router.beforeResolve((to, from, next) => {
		const matched = router.getMatchedComponents(to)
		const prevMatched = router.getMatchedComponents(from)
		let diffed = false

		if (store.state.error) store.commit("CLEAR_ERROR")

		const activated = matched.filter((component, i) => {
			return diffed || (diffed = (prevMatched[i] !== component))
		})
		if (!activated.length) {
			return next()
		}
		Promise.all(activated.map((c) => {
			if (c.asyncData) {
				return c.asyncData({ store, route: to })
			}
		})).then(() => {
			next()
		}).catch(next)
	})

	app.$mount("#app");
});
