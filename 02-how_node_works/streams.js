const fs = require("fs");
const server = require("http").createServer();

server.on("request", (request, response) => {
  /* ------------------------------- SOLUTION 01 ------------------------------ */
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   response.end(data);
  // });
  /* ------------------------------- SOLUTION 02 ------------------------------ */
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => {
  //   response.write(chunk);
  // });
  // readable.on("end", () => {
  //   response.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   response.statusCode = 500;
  //   response.end("File not found");
  // });
  /* ------------------------------- SOLUTION 03 ------------------------------ */
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(response);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
