const configs = {
  development: {
    PORT: 4000,
    HOST: 'http://localhost',
    IO: 'ws://localhost:4000',
    CONSUMER_KEY: 'A0gR3Q1JaRFMPiibvlqsrKQOO',
    CONSUMER_SECRET: 'vfyWKuJ2OxGGbGEKXWE51gvmiLzANWN69DTZCXS0h0rHwB6s1D'
  },
  production: {
    PORT: process.env.PORT,
    HOST: 'https://desolate-temple-13043.herokuapp.com',
    IO: null,
    CONSUMER_KEY: 'A0gR3Q1JaRFMPiibvlqsrKQOO',
    CONSUMER_SECRET: 'vfyWKuJ2OxGGbGEKXWE51gvmiLzANWN69DTZCXS0h0rHwB6s1D'
  }
};

module.exports = configs[process.env.NODE_ENV || 'development'];