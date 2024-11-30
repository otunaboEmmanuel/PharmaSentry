import { DataTypes } from "sequelize";

const TreatmentSession = (sequelize) => {
    return sequelize.define("TreatmentSession", {
        SessionID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        PatientID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ProgramID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        SessionDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Notes: {
            type: DataTypes.TEXT,
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

export default TreatmentSession;