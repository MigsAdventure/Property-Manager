//  CONSTANTS
// const PORT = process.env.PORT || 8000;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/PropertyManager';

//  PACKAGE REQUIRES
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
// const webpack = require('webpack');
// const webpackConfig = require('../webpack.config');

const mongoose = require('mongoose');
const config = require('./config');

const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_URI = config.db[NODE_ENV];

mongoose.Promise = Promise;
mongoose.connect(DB_URI, (err) => {
  console.log(err || `MongoDB connected to ${DB_URI}`);
});


//  APP DECLARATION
const appTest = express();
// const server = http.createServer(appTest);

//  WEBPACK CONFIG
// const compiler = webpack(webpackConfig);
// appTest.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true,
//   publicPath: webpackConfig.output.publicPath,
// }));
// appTest.use(require('webpack-hot-middleware')(compiler));

//  GENERAL MIDDLEWARE
appTest.use(morgan('dev'));
appTest.use(bodyParser.json());
appTest.use(bodyParser.urlencoded({ extended: true }));
appTest.use(express.static('public'));
//  ROUTES
appTest.use('/api', require('./routes/api'));

appTest.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../public/index.html');
  res.sendFile(indexPath);
});
// //  SERVER LISTEN
// server.listen(PORT, (err) => {
//   if (err) throw err;
//   console.log(`Server listening at http://localhost:${PORT}`);
// });
module.exports = appTest;
