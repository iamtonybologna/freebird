const configs = {
  development: {
    PORT: 4000,
    HOST: 'ws://localhost'
  },
  production: {
    PORT: process.env.PORT,
    HOST: 'ws://desolate-temple-13043.herokuapp.com'
  }
};

module.exports = configs[process.env.NODE_ENV || 'development'];