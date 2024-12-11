/* -------------------------------------------------------------------------- */
/*                                   MODULES                                  */
/* -------------------------------------------------------------------------- */
const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", textOut)
// console.log('File written!')

/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((product) =>
  slugify(product.productName, { lower: true })
);

console.log(slugs);

const server = http.createServer((request, response) => {
  console.log(request.url);

  /* --------------------------------- ROUTING -------------------------------- */
  // url modules helps to parse the url elements ?id=2321&abc=54398, exemple.

  // console.log(request.url)
  // console.log(url.parse(request.url, true)); // use true to convert to object

  const { query, pathname } = url.parse(request.url, true);

  // OVERVIEW
  if (pathname === '/overview' || pathname === '/') {
    response.writeHead(200, { 'content-type': 'text/html' });

    const cardsHTML = dataObj
      .map((cardInfo) => replaceTemplate(templateCard, cardInfo))
      .join('');

    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);
    response.end(output);

    // PRODUCT PAGE
  } else if (pathname === '/product') {
    response.writeHead(200, { 'content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    response.end(output);

    // API
  } else if (pathname === '/api') {
    response.writeHead(200, { 'Content-type': 'application/json' });
    response.end(data);
  } else {
    response.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'Hello World!',
    });
    response.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000.');
});
