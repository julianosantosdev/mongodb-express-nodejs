const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Costumer name: Jonas");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});

myEmitter.emit("newSale", 9);

////////////////////

const server = http.createServer();

server.on("request", (request, response) => {
  console.log("Request Received!");
  response.end("Request Received!");
});

server.on("request", (request, response) => {
  console.log("Another Request!");
});

server.on("close", () => {
  console.log("Server Closed!");
});

server.listen("8000", "localhost", () => {
  console.log("Waiting for requests...");
});
