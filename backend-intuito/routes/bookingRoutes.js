const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');


// Obtener todas las reservas
router.get('/', bookingController.getAllBookings);

router.post('/', bookingController.createBooking);
// Obtener una reserva por ID
router.get('/:id', bookingController.getBookingById);

// Actualizar una reserva por ID
router.put('/:id', bookingController.updateBooking);

// Eliminar una reserva por ID
router.delete('/:id', bookingController.deleteBooking);

router.post('/cancel-billboard-and-bookings', bookingController.cancelBillboardAndBookings);

module.exports = router;

