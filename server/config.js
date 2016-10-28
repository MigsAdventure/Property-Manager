const config = {

  db: {
    production: process.env.MONGODB_URI, // on heroku
    development: 'mongodb://localhost/PropertyManager', // locally
    test: 'mongodb://localhost/PropertyManager-app-test', //test mode
  },

};

module.exports = config;
