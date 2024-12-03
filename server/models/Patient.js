import { DataTypes } from "sequelize";

const Patient = (sequelize) => {
    return sequelize.define("Patient", {
        PatientID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        PhoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Status: {
            type: DataTypes.ENUM('undergoing treatment', 'completed treatment'), // Restrict to two states
            allowNull: true, // Allow null values
            defaultValue: 'undergoing treatment' // Default value
        },
    }, {
        timestamps: true,
    });
};


export default Patient;