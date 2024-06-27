module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      number: {
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
      tableName: 'rooms'
    });
  
    return Room;
  };
  