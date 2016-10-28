require('dotenv').config();

const PORT = process.env.PORT || 8000;
const app = require('./appTest');
const http = require('http');

const server = http.createServer(app);

// SERVER LISTEN
server.listen(PORT, (err) => {
  console.log(err || `Express listening on port ${PORT}`);
});
