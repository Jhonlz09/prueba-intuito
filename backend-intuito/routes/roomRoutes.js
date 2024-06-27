const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Endpoint para obtener todas las habitaciones
router.post('/', roomController.createRoom);


router.get('/', roomController.getAllRooms);

router.get('/:id', roomController.getRoomById);

router.put('/:id', roomController.updateRoom);

router.delete('/:id', roomController.deleteRoom);


module.exports = router;