const async = require('async');

module.exports = (sharp) => {
  return (buf1, buf2, callback) => {
    async.waterfall([
      (cb) => {
        sharp(buf1)
        .resize(295, 600)
        .crop(sharp.gravity.center)
        .toBuffer(cb)
      },
      (buf, info, cb) => {
        sharp(buf2)
        .resize(295, 600)
        .crop(sharp.gravity.center)
        .background({ r: 0, g: 0, b: 0, a: 0 })
        .extend({ top: 0, bottom: 0, left: 305, right: 0 })
        .overlayWith(buf, { top: 0, left: 0, })
        .background('white')
        .toBuffer(cb)
      },
      (buf, info, cb) => {
        sharp(buf)
        .overlayWith('./static/logo.png', { top: 453, left: 405, })
        .quality(90)
        .jpeg()
        .toBuffer(cb)
      }
    ], callback)
  };
};
