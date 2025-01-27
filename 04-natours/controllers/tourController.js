const Tour = require('../models/tourModel');

exports.getAllTours = async (request, response) => {
  try {
    const allTours = await Tour.find();
    response.status(200).json({
      status: 'success',
      results: allTours.length,
      data: {
        allTours,
      },
    });
  } catch (error) {
    response.status(400).json({ message: error });
  }
};

exports.getTourById = async (request, response) => {
  try {
    const tourById = await Tour.findById(request.params.id);

    response.status(200).json({
      status: 'success',
      data: {
        tourById,
      },
    });
  } catch (error) {
    response.status(400).json({ message: error });
  }
};

exports.createTour = async (request, response) => {
  // const newTour = new Tour({});
  // newTour.save();

  try {
    const newTour = await Tour.create(request.body);

    response.status(201).json({
      status: 'sucess',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    response
      .status(400)
      .json({ status: 'fail', message: 'Invalid data sent!' });
  }
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
