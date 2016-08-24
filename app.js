const express = require('express');
const morgan = require('morgan');

module.exports = (apis) => {
  const montage = require('./montage')(apis.sharp);
  const download = require('./download')(apis.request);

  const app = express();

  app.use(morgan('dev'));

  app.get('/montage', (req, res) => {
    download(req.query.l, req.query.r, (err, bufs) => {
      if (err) {
        console.error(err.message);
        res.status(500).end();
      }

      montage(bufs.l, bufs.r, (err, buf) => {
        if (err) {
          console.error(err.message);
          return res.status(500).end();
        }

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(buf);
      });
    });
  });
  return app;
};
