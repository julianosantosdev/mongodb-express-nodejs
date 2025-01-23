const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
// Middleware para analisar JSON
// O corpo da requisição (JSON) estará acessível em req.body

app.use((request, response, next) => {
  console.log('Hello from the middeware!');
  next();
});

app.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) ROUTES HANDLERS
const getAllTours = (request, response) => {
  console.log(request.requestTime);

  response.status(200).json({
    status: 'success',
    requestedAt: request.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTourById = (request, response) => {
  console.log(request.params);
  const id = request.params.id * 1;
  const tour = tours.find((item) => item.id === id);

  if (!tour) {
    return response.status(404).json({ status: 'fail', message: 'invalid ID' });
  }

  response.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (request, response) => {
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
};

const updateTour = (request, response) => {
  if (request.params.id * 1 > tours.length) {
    return response.status(404).json({ status: 'fail', message: 'invalid ID' });
  }

  response.status(200).json({
    status: 'sucess',
    data: {
      tour: 'updated tour here',
    },
  });
};

const deleteTour = (request, response) => {
  if (request.params.id * 1 > tours.length) {
    return response.status(404).json({ status: 'fail', message: 'invalid ID' });
  }

  response.status(204).json({
    status: 'sucess',
    data: null,
  });
};

const getAllUsers = (request, response) => {
  response
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined!' });
};

const createUser = (request, response) => {
  response
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined!' });
};

const getUser = (request, response) => {
  response
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined!' });
};

const updateUser = (request, response) => {
  response
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined!' });
};

const deleteUser = (request, response) => {
  response
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined!' });
};

// 3) ROUTES
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
