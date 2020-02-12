import pkg from '../../../package.json';

/**
 * @resourceStatus
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const resourceStatus = (req, res) => {
  newrelic.setIgnoreTransaction(true);
  res.status(200).json({
    createdBy: 'Hemerson Vianna <hemerson.lourenco@gmail.com>',
    version: process.version,
    applicationName: 'webapp',
    implementationVersion: `v${pkg.version}`,
  });
};

export default resourceStatus;
