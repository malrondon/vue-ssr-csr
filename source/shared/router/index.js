import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Home from "views/home";
const NotFound = () => System.import("views/not-found");

const routes = [
	{ path: "/", component: Home }
];

routes.push({ path: "*", component: NotFound });

export function createRouter() {
	return new Router({
		mode: "history",
		scrollBehavior: () => ({ y: 0 }),
		routes
	})
};
