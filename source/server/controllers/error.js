import template from '../templates/error';

const errorMiddleware = (err, req, res, next) => {
  if (err.status === 302 || err.status === 301 || err.status === 404) {
    console.error(err.message);
  } else {
    newrelic.noticeError(err);
    console.error(err);
  }

  if (err.status === 302 || err.status === 301) {
    return res.redirect(err.status, err.redirectLocation || '/');
  }

  res.set({
    'Cache-control': 'max-age=1800',
    Error: err,
  });
  res.status(err && err.status ? err.status : 500).send(template());
};

export default errorMiddleware;
