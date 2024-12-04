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
        timestamps: true, // This enables createdAt and updatedAt
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    });
};
export default Substance;