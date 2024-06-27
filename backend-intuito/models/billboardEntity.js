module.exports = (sequelize, DataTypes) => {
    const Billboard = sequelize.define(
        "Billboard",
        {
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            startTime: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            endTime: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            timestamps: false,
            tableName: "billboards",
        }
    );

    return Billboard;
};
