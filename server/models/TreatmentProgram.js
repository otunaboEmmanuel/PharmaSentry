import { DataTypes } from "sequelize";

const TreatmentProgram = (sequelize) => {
    return sequelize.define("TreatmentProgram", {
        ProgramID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Duration: {
            type: DataTypes.INTEGER, // Duration in days
            allowNull: false,
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

export default TreatmentProgram;