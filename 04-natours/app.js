const express = require('express');
const fs = require('fs');
const app = express();

// Middleware para analisar JSON
app.use(express.json());
// O corpo da requisição (JSON) estará acessível em req.body

// app.get('/', (request, response) => {
//   response
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
);

app.get('/api/v1/tours', (request, response) => {
  response.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (request, response) => {
  console.log(request.body);
  response.send('Done');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
