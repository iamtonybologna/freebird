const configs = {
  development: {
    PORT: 4000,
    HOST: 'http://localhost',
    IO: 'ws://localhost:4000'
  },
  production: {
    PORT: process.env.PORT,
    HOST: 'https://desolate-temple-13043.herokuapp.com',
    IO: null
  }
};

module.exports = configs[process.env.NODE_ENV || 'development'];