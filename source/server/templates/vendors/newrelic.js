export default () => {
  try {
    return newrelic.getBrowserTimingHeader();
  } catch (e) {
    return '<!-- NewRelic Unavailable -->';
  }
};
