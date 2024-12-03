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
            get() {
                const rawValue = this.getDataValue('SessionDate');
                return rawValue ? new Date(rawValue).toLocaleString() : null;
            },
        },
        Notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                const rawValue = this.getDataValue('CreatedAt');
                return rawValue ? new Date(rawValue).toLocaleString() : null;
            },
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                const rawValue = this.getDataValue('UpdatedAt');
                return rawValue ? new Date(rawValue).toLocaleString() : null;
            },
        },
    }, {
        timestamps: false, // Disable automatic timestamps if you handle them manually
    });
};

export default TreatmentSession;