module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    genre: {
      type: DataTypes.ENUM('ACCION', 'AVENTURA', 'COMEDIA', 'DRAMA', 'FANTASIA', 'HORROR', 'MUSICAL', 'MISTERIO', 'ROMANCE', 'CIENCIA FICCION', 'DEPORTES', 'SUSPENSO', 'VAQUEROS'),
      allowNull: false
    },
    allowedAge: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    lengthMinutes: {
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
    tableName: 'movies'
  });

  return Movie;
};
