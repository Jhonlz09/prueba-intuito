const express = require('express');
const router = express.Router();
const billboardController = require('../controllers/billboardController');



router.get('/', billboardController.getAllBillboards);
router.get('/:id', billboardController.getBillboardById);
router.post('/', billboardController.createBillboard);
router.put('/:id', billboardController.updateBillboard);

router.get('/terror-bookings', billboardController.getTerrorBookingsInRange);
router.get('/seats-availability/:roomId', billboardController.getSeatsAvailability);



module.exports = router;