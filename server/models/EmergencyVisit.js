import { DataTypes } from "sequelize";

const EmergencyVisit = (sequelize) => {
    return sequelize.define("EmergencyVisit", {
        VisitID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        PatientID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        VisitDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Reason: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Outcome: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: false, // Disable automatic timestamps if you handle them manually
    });
};

export default EmergencyVisit;