const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Billboard = require('./billboardEntity')(sequelize, DataTypes);
db.Booking = require('./bookingEntity')(sequelize, DataTypes);
db.Customer = require('./customerEntity')(sequelize, DataTypes);
db.Movie = require('./movieEntity')(sequelize, DataTypes);
db.Room = require('./roomEntity')(sequelize, DataTypes);
db.Seat = require('./seatEntity')(sequelize, DataTypes);

// Define associations
db.Movie.hasMany(db.Billboard, { foreignKey: 'movieId' });
db.Billboard.belongsTo(db.Movie, { foreignKey: 'movieId' });

db.Room.hasMany(db.Billboard, { foreignKey: 'roomId' });
db.Billboard.belongsTo(db.Room, { foreignKey: 'roomId' });

db.Customer.hasMany(db.Booking, { foreignKey: 'customerId' });
db.Booking.belongsTo(db.Customer, { foreignKey: 'customerId' });

db.Seat.hasMany(db.Booking, { foreignKey: 'seatId' });
db.Booking.belongsTo(db.Seat, { foreignKey: 'seatId' });

db.Billboard.hasMany(db.Booking, { foreignKey: 'billboardId' });
db.Booking.belongsTo(db.Billboard, { foreignKey: 'billboardId' });

db.Room.hasMany(db.Seat, { foreignKey: 'roomId' });
db.Seat.belongsTo(db.Room, { foreignKey: 'roomId' });

module.exports = db;
