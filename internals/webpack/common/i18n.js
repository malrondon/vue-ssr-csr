const StringReplacePlugin = require('string-replace-webpack-plugin');

const Vue = require("vue");
const VueI18n = require("vue-i18n");

const config = require("../../../config");

const messages = {
	main:	require(`../../languages/${config.language.filename}`),
	fallback: config.fallbackLanguage ? require(`../../languages/${config.fallbackLanguage.filename}`) : null
}

const i18n = new VueI18n({
	locale: "main",
	fallbackLocale: messages.fallback ? "fallback" : null,
	messages
});

export const init = () => {
  Vue.use(VueI18n);
};

export const doI18n = StringReplacePlugin.replace({
	replacements: [{
		pattern: /\$ts\((.+)\)/g,
		replacement: function(fullMatch, params, offset, string) {
			params = params.split(",").map((p) => eval(p))
			if (i18n.tc(...params) === params[0]) {
				if (config.isProduction) {
					throw new Error(`[i18n] Translation key "${params[0]}" does not exist`)
				} else {
					console.warn(`[i18n] Translation key "${params[0]}" does not exist`)
				}
			}
			return i18n.tc(...params)
		}
	}]
});
