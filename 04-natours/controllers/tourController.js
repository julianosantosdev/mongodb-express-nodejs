const Tour = require('../models/tourModel');

exports.checkBody = (request, response, next) => {
  const bodyContent = request.body;

  if (!bodyContent.name || !bodyContent.price) {
    return response
      .status(400)
      .json({ status: 'fail', message: 'Missing name or price' });
  }
  next();
};

exports.getAllTours = (request, response) => {
  console.log(request.requestTime);

  response.status(200).json({
    status: 'success',
    requestedAt: request.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTourById = (request, response) => {
  // const tour = tours.find((item) => item.id === id);

  // response.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = (request, response) => {
  response.status(201).json({
    status: 'sucess',
    // data: {
    //   tour: newTour,
    // },
  });
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
