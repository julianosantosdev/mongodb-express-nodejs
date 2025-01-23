const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (request, response, next, val) => {
  if (request.params.id * 1 > tours.length) {
    return response.status(404).json({ status: 'fail', message: 'invalid ID' });
  }
  next();
};

exports.getAllTours = (request, response) => {
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

exports.getTourById = (request, response) => {
  console.log(request.params);
  const id = request.params.id * 1;
  const tour = tours.find((item) => item.id === id);

  response.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (request, response) => {
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

exports.updateTour = (request, response) => {
  response.status(200).json({
    status: 'sucess',
    data: {
      tour: 'updated tour here',
    },
  });
};

exports.deleteTour = (request, response) => {
  response.status(204).json({
    status: 'sucess',
    data: null,
  });
};
