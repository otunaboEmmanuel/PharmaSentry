import { DataTypes } from "sequelize";

const Feedback = (sequelize) => {
    return sequelize.define("Feedback", {
        FeedbackID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Comments: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Rating: {
            type: DataTypes.INTEGER, // e.g., 1 to 5
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

export default Feedback;