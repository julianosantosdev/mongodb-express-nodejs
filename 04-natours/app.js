const express = require('express');
const fs = require('fs');
const app = express();

// Middleware para analisar JSON
app.use(express.json());
// O corpo da requisição (JSON) estará acessível em req.body

/* 
app.get('/', (request, response) => {
  response
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
}); 
*/

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
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

app.get('/api/v1/tours/:id', (request, response) => {
  console.log(request.params);
  const id = request.params.id * 1;
  const tour = tours.find((item) => item.id === id);

  // if (id > tours.length) {
  if (!tour) {
    return response.status(404).json({ status: 'fail', message: 'invalid ID' });
  }

  response.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (request, response) => {
  // console.log(request.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, request.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (error) => {
      response.status(201).json({
        status: 'sucess',
        data: {
          tour: newTour,
        },
      });
    }
  );
  // response.send('Done');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
