module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        timestamps: false,
        tableName: 'bookings'
    });

    return Booking;
};
