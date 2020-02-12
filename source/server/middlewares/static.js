import path from 'path';
import express from 'express';

const publicDir = path.join(__dirname, '..', '..', '..', '/dist');
const options = {
  dotfiles: 'ignore',
  etag: false,
  fallthrough: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '3600s',
  redirect: false,
  setHeaders: function(res, path, stat) {
    res.set('x-timestamp', Date.now());
    res.set('Edge-Control', 'max-age=3600s, cache-maxage=3600s');
  },
};
export default express.static(publicDir, options);
