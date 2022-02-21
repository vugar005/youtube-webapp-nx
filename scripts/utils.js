const rimraf = require('rimraf');

const rimrafPromise = (...args) => {
  return new Promise((resolve, reject) => {
    rimraf(...args, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

module.exports = {
  rimrafPromise,
};
