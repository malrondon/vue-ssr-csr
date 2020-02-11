import Vue from "vue";
import VueI18n from "vue-i18n";
import { sync } from "vuex-router-sync";

import { createStore } from "./store";
import { createRouter } from "./router";

import App from "./App.vue";

import metaInfo from "./mixins/meta-info";

Vue.mixin(metaInfo);
Vue.use(VueI18n);

const messages = {
	"main": require(`../../languages/${LANGUAGE_MAIN_FILENAME}.json`)
};

export function createApp(ssrContext) {
	const i18n = new VueI18n({
		locale: "main",
		messages
	});

	const store = createStore();
	const router = createRouter();

	sync(store, router);

	const app = new Vue({
		router,
		store,
		i18n,
		ssrContext,
		render: (h) => h(App)
	});

	return { app, router, store };
};
