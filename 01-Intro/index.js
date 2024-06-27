// express is web framework for node.js
// it has all built in method like url http etc

// const http = require("http");
// const fs = require("fs");
// const url = require("url");
// this all present in express object
const express = require("express");
const app = express();
// this app is like myHandler

// function myHandler(req, res) {
//   if (req.url === "/favicon.ico") {
//     return res.end();
//   }
//   const log = `${Date.now()}: ${req.url} New Request Received\n`;
//   const myUrl = url.parse(req.url, true);
//   fs.appendFile("log.txt", log, (err, data) => {
//     switch (myUrl.pathname) {
//       case "/":
//         if (req.method === "GET") res.end("Home Page");
//         break;
//       case "/about":
//         const username = myUrl.query.name;
//         res.end(`Hi,${username}`);
//         break;
//       case "/search":
//         const search = myUrl.query.search_query;
//         res.end(search);
//       case "/signup":
//         if (req.method === "GET") res.end("This is a signup form");
//         else if (req.method === "POST") {
//           //DB Query
//           res.end("Success");
//         }
//       default:
//         res.end("404 Error");
//     }
//   });
// }

//The app responds with “Hello World!” for requests to the root URL (/) or route. For every other path, it will respond with a 404 Not Found.
// getting
app.get("/", (req, res) => {
  res.send("Hello world");
});

// we don't need url for query
app.get("/about", (req, res) => {
  return res.send(
    "Hello From About Page " +
      "hey " +
      req.query.name +
      " you are " +
      req.query.age
  );
});

// const myServer = http.createServer(myHandler);
// myServer.listen(8000, () => console.log("All Right"));

// this http and create server can be done by express

app.listen(8000, () => console.log("Example app Listening on port"));

// now u can uninstall url module npm uninstall url
