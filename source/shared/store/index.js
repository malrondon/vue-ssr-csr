import Vue from "vue";
import Vuex from "vuex";

import { actions } from "./actions";
import { mutations } from "./mutations";

Vue.use(Vuex);

export function createStore() {
	return new Vuex.Store({
		strict: process.env.NODE_ENV !== "production",

		state: {
			counter: 0,
			remotePageContent: null,
			error: null
		},
		actions,
		mutations
	})
};
