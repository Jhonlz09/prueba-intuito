const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Crear un nuevo cliente
router.post('/', customerController.createCustomer);

// Obtener todos los clientes
router.get('/', customerController.getAllCustomers);

// Obtener un cliente por ID
router.get('/:id', customerController.getCustomerById);

// Actualizar un cliente por ID
router.put('/:id', customerController.updateCustomerById);

// Eliminar un cliente por ID
router.delete('/:id', customerController.deleteCustomerById);

module.exports = router;