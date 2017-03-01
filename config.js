const configs = {
  development: {
    PORT: 4000
  },
  production: {
    PORT: process.env.PORT
  }
};

module.exports = configs[process.env.NODE_ENV || 'development'];