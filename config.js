const configs = {
  development: {
    PORT: 4000,
    HOST: 'http://localhost'
  },
  production: {
    PORT: process.env.PORT,
    HOST: 'https://desolate-temple-13043.herokuapp.com'
  }
};

module.exports = configs[process.env.NODE_ENV || 'development'];