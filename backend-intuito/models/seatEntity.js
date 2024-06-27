module.exports = (sequelize, DataTypes) => {
    const Seat = sequelize.define('Seat', {
        number: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        rowNumber: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        timestamps: false,
        tableName: 'seats'
    });

    return Seat;
};
