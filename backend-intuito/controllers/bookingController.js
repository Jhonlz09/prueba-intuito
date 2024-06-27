const { Billboard, Booking, Seat, Customer } = require('../models');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: {
        status: true
      }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).send(error.message);
  }};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).send('Reserva no encontrada');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const updated = await Booking.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 1) {
      res.send('Reserva actualizada');
    } else {
      res.status(404).send('Reserva no encontrada');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.send('Reserva eliminada');
    } else {
      res.status(404).send('Reserva no encontrada');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.cancelBillboardAndBookings = async (req, res) => {
  const { billboardId } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const billboard = await Billboard.findByPk(billboardId, { include: [{ model: Booking, include: [Customer] }, { model: Room, include: [Seat] }] });

    if (new Date(billboard.date) < new Date()) {
      throw new Error('No se puede cancelar funciones de la cartelera con fecha anterior a la actual');
    }

    const bookings = billboard.Bookings;
    const customers = bookings.map(booking => booking.Customer);

    await Booking.update({ status: false }, { where: { billboardId }, transaction });
    await Seat.update({ status: true }, { where: { roomId: billboard.roomId }, transaction });
    await Billboard.update({ status: false }, { where: { id: billboardId }, transaction });
    await transaction.commit();

    console.log('Affected customers:', customers);
    res.status(200).json(customers);
  } catch (error) {
    await transaction.rollback();
    res.status(500).send(error.message);
  }
};
