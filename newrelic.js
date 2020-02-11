const path = require('path');

/*eslint-disable */

/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['appweb'],
  /**
   * Your New Relic license key.
   */
  agent_enabled: process.env.NODE_ENV === 'production',
  license_key: 'xxxx',
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info',
    filepath: path.join(process.cwd(), 'logs', 'newrelic.log')
  }
};
