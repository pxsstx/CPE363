// "use strict";
// const http = require("http");
// const url = require("url");

// console.log("Server running at http://localhost:8000");

// const render = (request, response) => {
//   // Use writeHead for status and headers
//   response.writeHead(200, { "Content-Type": "text/html" });

//   let reqUrl = url.parse(request.url, true);
//   const { path, pathname, search, query } = reqUrl;

//   response.write(`
//     path: ${path}<br>
//     pathname: ${pathname}<br>
//     search: ${search}<br>
//     `);

//   for (const k in query) {
//     response.write(`${k} : ${query[k]} <br>`);
//   }

//   // Essential: Tell the server you're done sending data
//   response.end();
// };

// const fs = require("fs");

// const render = (request, response) => {
//   let url = request.url;
//   url = url.endsWith("/") ? url : url + "/";
//   let fileName = "";
//   switch (url) {
//     case "/":
//       fileName += "index3.html";
//       break;
//     case "/about/":
//       fileName += "about.html;";
//       break;
//     case "/product/":
//       fileName += "product.html";
//       break;
//   }

//   fs.readFile(fileName, (error, content) => {
//     let ctype = { "Content-Type": "text/html" };
//     if (!error) {
//       response.writeHead(200, ctype);
//       response.write(content);
//     } else {
//       response.writeHead(404, ctype);
//       response.write(error.massage);
//     }
//     return response.end;
//   });
// };

"use strict";
const myModule = require("./myModule");

// 1. Define the logic first (to avoid Initialization Error)
const render = (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });

  let r = new myModule.Random();
  response.write("Random number: " + r.getInteger(1, 100));

  response.end();
};

// 2. Start the server using the module
myModule.createServer(render);

// http.createServer(render).listen(8000);
