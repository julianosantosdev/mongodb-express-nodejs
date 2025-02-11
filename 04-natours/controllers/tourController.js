const Tour = require('../models/tourModel');

exports.getAllTours = async (request, response) => {
  try {
    // const filteredTours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy',
    // });

    // BUILDING THE QUERY, without sending it or await, because we still can change the methods like sort etc, before executing it
    const queryObj = { ...request.query };
    const excludedFields = ['page', 'sort', 'field', 'limit'];
    excludedFields.forEach((element) => delete queryObj[element]);

    const query = Tour.find(queryObj);

    // const filteredTours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // EXECUTING QUERY and awaiting for the results
    const tours = await query;

    // SEND RESPONSE
    response.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
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

exports.updateTour = async (request, response) => {
  try {
    const tourToUpdate = await Tour.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
      },
    );
    response.status(200).json({
      status: 'sucess',
      data: {
        tour: tourToUpdate,
      },
    });
  } catch (error) {
    response
      .status(400)
      .json({ status: 'fail', message: 'Invalid data sent!' });
  }
};

exports.deleteTour = async (request, response) => {
  try {
    await Tour.findByIdAndDelete(request.params.id);
    response.status(204).json({
      status: 'sucess',
      data: null,
    });
  } catch (error) {
    response
      .status(400)
      .json({ status: 'fail', message: 'Invalid data sent!' });
  }
};
