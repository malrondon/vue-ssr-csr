import Promise from 'bluebird';
import request from 'request';
import pkg from '../../../package.json';

const dep = {};
const opts = {
  url: `/`,
  method: 'GET',
  json: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const getApi = function() {
  return new Promise((resolve, reject) => {
    request(opts, (err, response) => {
      if (!err && response) {
        dep.name = 'API';
        dep.message = 'Succesfully connected with API.';
        dep.description = 'HTTP status code:[200].';
        dep.reference = opts.url;
        dep.success = true;
        dep.status = 'OK';
        return resolve(dep);
      } else {
        dep.name = 'API';
        dep.message = 'Error connecting with API';
        dep.description = 'HTTP status code:[503].';
        dep.reference = opts.url;
        dep.success = false;
        dep.status = 'FAIL';
        return reject(dep);
      }
    });
  });
};

/**
 * @health
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const health = (req, res) => {
  newrelic.setIgnoreTransaction(true);
  const health = {
    name: pkg.name,
    message: 'The application is fully functional.',
    success: true,
    status: 'OK',
    statusCode: 200,
    time: new Date().toUTCString(),
    dependencies: [],
  };
  const promises = [getApi()];

  Promise.all(
    promises.map(promise => {
      return promise.reflect();
    })
  )
    .each(inspection => {
      if (inspection.isFulfilled()) {
        health.dependencies.push(inspection.value());
      } else {
        health.statusCode = inspection.status;
        health.dependencies.push(inspection.reason());
      }
    })
    .then(() => {
      res.status(200).json(health);
    })
    .catch(() => {
      res.status(500).json(health);
    });
};

export default health;
