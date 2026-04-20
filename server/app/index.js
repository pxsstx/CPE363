// Program 1

const port = 8000;
const http = require("http");

// const server = http.createServer((req, res) => {
//   res.write(`Server Test
//     \nserver start at port ${port}
//     \nPress <Ctrl + C> to stop the server`);
//   res.end();
// });

// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// Program 2

// const render = (req, res) => {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   let html = `
//     <html>
//       <body>
//         <h2>Test html on Node.js</h2>
//       </body>
//     </html>
//   `;
//   res.write(html);
//   res.end();
// };

// http.createServer(render).listen(port);
// console.log(`Server is running on http://localhost:${port}`);

const fs = require("fs");

http
  .createServer((req, res) => {
    if (req.url === "/style.css") {
      fs.readFile("style.css", (err, data) => {
        if (err) {
          res.writeHead(404);
          return res.end();
        }
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      });
    } else {
      fs.readFile("index.html", (err, data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    }
  })
  .listen(port);
