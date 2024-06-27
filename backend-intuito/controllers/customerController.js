const { Customer } = require('../models');

exports.createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).send('El cliente no fue encontrado.');
        }
        res.json(customer);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCustomerById = async (req, res) => {
    try {
        const [updated] = await Customer.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCustomer = await Customer.findByPk(req.params.id);
            res.status(200).json(updatedCustomer);
        } else {
            res.status(404).send('El cliente no fue encontrado.');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteCustomerById = async (req, res) => {
    try {
        const deleted = await Customer.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send('El cliente fue eliminado.');
        } else {
            res.status(404).send('El cliente no fue encontrado.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};