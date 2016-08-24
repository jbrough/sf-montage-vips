const async = require("async");

module.exports = (request) => {

  return (uri1, uri2, callback) => {
    async.parallel({
      l: (cb) => get(uri1, cb),
      r: (cb) => get(uri2, cb),
    }, callback)
  };

  function RequestError(code, msg) {
    this.code = code;
    this.message = msg;
  }
  RequestError.prototype = new Error();

  function get(uri, cb) {
    const opts = {
      uri,
      encoding: null,
    };

    function callback(err, res, body) {
      if (err) {
        return cb(err)
      } else if (res.statusCode != 200) {
        return cb(new RequestError(res.statusCode, res.body.toString()));
      }

      return cb(null, body);
    };

    request.get(opts, callback);
  };
}
