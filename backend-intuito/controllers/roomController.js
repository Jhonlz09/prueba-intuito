const {Room} = require('../models');

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.json(rooms);
    } catch (error) {
        res.status(500).send( error.message );
    }
};

exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (!room) {
            return res.status(404).send('La habitacion no fue encontrada.');
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la habitación' });
    }
};

exports.createRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la habitación' });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const [updated] = await Room.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedRoom = await Room.findByPk(req.params.id);
            res.status(200).json(updatedRoom);
        } else {
            res.status(404).send('La habitación no fue encontrada.');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.destroy({
            where: { id: req.params.id }
        });
        if (!room) {
            return res.status(404).json({ error: 'Habitación no encontrada' });
        }
        res.json({ message: 'Habitación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la habitación' });
    }
};