const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');


router.get('/', seatController.getAllSeats);
router.get('/:id', seatController.getSeatById);
router.post('/', seatController.createSeat);
router.put('/:id', seatController.updateSeat);
router.post('/disable-and-cancel', seatController.disableSeatAndCancelBooking);

module.exports = router;

