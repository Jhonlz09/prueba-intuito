const { Billboard, Seat, Booking } = require('../models');
const { Op, fn, col, literal, where } = require('sequelize');


exports.getAllBillboards = async (req, res) => {
  try {
    const billboards = await Billboard.findAll();
    res.json(billboards);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getBillboardById = async (req, res) => {
  try {
    const billboard = await Billboard.findByPk(req.params.id);
    if (billboard) {
      res.json(billboard);
    } else {
      res.status(404).send('Cartelera no encontrada');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createBillboard = async (req, res) => {
  try {
    const billboard = await Billboard.create(req.body);
    res.status(201).json(billboard);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateBillboard = async (req, res) => {
  try {
    const billboard = await Billboard.findByPk(req.params.id);
    if (!billboard) {
      return res.status(404).send('Billboard not found');
    }
    await billboard.update(req.body);
    res.json(billboard);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getTerrorBookingsInRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const bookings = await Billboard.findAll({
      include: [{
        model: Booking,
        where: {
          date: {
            [Op.between]: [startDate, endDate]
          }
        },
        include: [{
          model: Movie,
          where: { genre: 'HORROR' }
        }]
      }]
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// exports.getSeatsAvailability = async (req, res) => {
//   try {
//     const [results, metadata] = await sequelize.query(`
//       SELECT 
//         s."roomId",
//         COUNT(s.id) - COUNT(bks.id) AS seats_available,
//         COUNT(bks.id) AS seats_occupied
//       FROM 
//         seats s
//       LEFT JOIN bookings bks ON s.id = bks."seatId"
//       LEFT JOIN billboards b ON bks."billboardId" = b.id AND b.date = CURRENT_DATE
//       GROUP BY 
//         s."roomId";
//     `);

//     res.json(results);
//   } catch (error) {
//     res.status(500).send({
//       message: 'Error al obtener la disponibilidad de asientos',
//       error: error.message
//     });
//   }
// };

exports.getSeatsAvailability = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const seatsAvailability = await Seat.findAll({
      where: {
        roomId: roomId // Filtra los asientos por roomId
      },
      attributes: [
        'roomId',
        [literal('COUNT("Seat"."id") - COUNT("Bookings"."id")'), 'seatsAvailable'],
        [fn('COUNT', col('Bookings.id')), 'seatsOccupied']
      ],
      include: [{
        model: Booking,
        attributes: [],
        required: false, // Esto asegura un LEFT JOIN
        include: [{
          model: Billboard,
          attributes: [],
          required: false,
          where: where(fn('date', col('Bookings->Billboard.date')), '=', literal('CURRENT_DATE'))
        }]
      }],
      group: ['Seat.roomId'], // Asegúrate de que el grupo corresponda a la columna correcta
      raw: true
    });
    res.json(seatsAvailability);
  } catch (error) {
    console.error('Error al obtener la disponibilidad de asientos:', error);
    res.status(500).send({
      message: 'Error al obtener la disponibilidad de asientos',
      error: error.message
    });
  }
};