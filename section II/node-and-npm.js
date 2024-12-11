/* -------------------------------------------------------------------------- */
/*                                   MODULES                                  */
/* -------------------------------------------------------------------------- */
const fs = require("fs");
const http = require("http");
const url = require("url");

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", textOut)
// console.log('File written!')

/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */
const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName); // using g all those placeholders will be replaced, not only one.
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((request, response) => {
  console.log(request.url);

  /* --------------------------------- ROUTING -------------------------------- */
  // url modules helps to parse the url elements ?id=2321&abc=54398, exemple.

  const pathName = request.url;

  // OVERVIEW
  if (pathName === "/overview" || pathName === "/") {
    response.writeHead(200, { "content-type": "text/html" });

    const cardsHTML = dataObj
      .map((cardInfo) => replaceTemplate(templateCard, cardInfo))
      .join("");

    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);
    response.end(output);

    // PRODUCT PAGE
  } else if (pathName === "/product") {
    response.end("This is product");

    // API
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
