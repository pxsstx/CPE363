"use strict";
const http = require("http");

class Random {
  getInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

const createServer = (renderFunc, port = 8000) => {
  // We use the passed-in renderFunc to handle requests
  http.createServer(renderFunc).listen(port);
  console.log(`Server running at http://localhost:${port}`);
};

// Export the tools
module.exports = { Random, createServer };
