const { Seat, Booking } = require('../models');


exports.getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.findAll();
    res.json(seats);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getSeatById = async (req, res) => {
  try {
    const seat = await Seat.findByPk(req.params.id);
    if (seat) {
      res.json(seat);
    } else {
      res.status(404).send('Seat not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createSeat = async (req, res) => {
  try {
    const seat = await Seat.create(req.body);
    res.status(201).json(seat);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateSeat = async (req, res) => {
  try {
    const seat = await Seat.findByPk(req.params.id);
    if (!seat) {
      return res.status(404).send('Seat not found');
    }
    await seat.update(req.body);
    res.json(seat);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.disableSeatAndCancelBooking = async (req, res) => {
  const { bookingId } = req.body;
  const transaction = await sequelize.transaction();
  try {
    // await Seat.update({ status: false }, { where: { id: seatId }, transaction });
    await Booking.update({ status: false }, { where: { id: bookingId }, transaction });
    await transaction.commit();
    res.status(200).send('Seat disabled and booking canceled');
  } catch (error) {
    await transaction.rollback();
    res.status(500).send(error.message);
  }
};
