/* -------------------------------------------------------------------------- */
/*                                   MODULES                                  */
/* -------------------------------------------------------------------------- */
const fs = require("fs");
const { fstat } = require("fs");
const http = require("http");
const { it } = require("node:test");
const url = require("url");

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", textOut)
// console.log('File written!')

/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// const dataObj = JSON.parse(data);

const server = http.createServer((request, response) => {
  console.log(request.url);

  /* --------------------------------- ROUTING -------------------------------- */
  // url modules helps to parse the url elements ?id=2321&abc=54398, exemple.

  const pathName = request.url;
  if (pathName === "/overview") {
    response.end("This is overview");
  } else if (pathName === "/product") {
    response.end("This is product");
  } else if (pathName === "/api") {
    response.writeHead(200, { "Content-type": "application/json" });
    response.end(data);
  } else {
    response.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello World!",
    });
    response.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000.");
});
