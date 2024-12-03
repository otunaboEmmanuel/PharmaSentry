import { DataTypes } from 'sequelize';

const Substance = (sequelize) => {
    return sequelize.define("Substance", {
        SubstanceID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        // Enable timestamps
        timestamps: true,
        // Optionally, you can customize the names of the timestamp fields
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    });
};

export default Substance;