languages = {
	"pt": {
		filename: "pt",
		fallback: "en",
		isRTL: false
	},
	"en": {
		filename: "en",
		fallback: null,
		isRTL: true
	}
}

const currentLanguage = process.env.BUILD_LANGUAGE || "en";

if (!languages[currentLanguage]) {
	throw new Error("Undefined language: " + currentLanguage);
}

const language = languages[currentLanguage];
const fallbackLanguage = languages[language.fallback] || null;

const nodeEnv = process.env.NODE_ENV || "development";

module.exports = {
	language: language,
	fallbackLanguage: fallbackLanguage,

	nodeEnv: nodeEnv,
	isProduction: nodeEnv === "production",
	isTesting: nodeEnv === "testing",

	server: {
		port: process.env.SERVER_PORT || 8080
	}
}
