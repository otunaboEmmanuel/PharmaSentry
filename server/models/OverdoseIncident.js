import { DataTypes } from "sequelize";

const OverdoseIncident = (sequelize) => {
    return sequelize.define("OverdoseIncident", {
        IncidentID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        PatientID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        SubstanceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        IncidentDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Severity: {
            type: DataTypes.STRING, // e.g., Mild, Moderate, Severe
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

export default OverdoseIncident;