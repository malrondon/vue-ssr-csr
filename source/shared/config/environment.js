const NODE_ENV = process.env.NODE_ENV || 'development';
const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:8000';
// const LANGUAGE_MAIN_FILENAME = JSON.stringify(config.language.filename);
// const LANGUAGE_FALLBACK_FILENAME = config.fallbackLanguage ? JSON.stringify(config.fallbackLanguage.filename) : null;
// const LANGUAGE_ISRTL = config.language.isRTL;
const LANGUAGE_MAIN_FILENAME = 'en';
const LANGUAGE_FALLBACK_FILENAME = 'en';
const LANGUAGE_ISRTL = 'en';

module.exports = {
  NODE_ENV,
  PUBLIC_URL,
  LANGUAGE_MAIN_FILENAME,
  LANGUAGE_FALLBACK_FILENAME,
  LANGUAGE_ISRTL,
};
