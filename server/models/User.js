import { DataTypes } from "sequelize";

const User = (sequelize) => {
    return sequelize.define("User", {
        UserID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Role: {
            type: DataTypes.STRING,
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
    });
};

export default User;