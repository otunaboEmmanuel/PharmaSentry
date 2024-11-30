import { DataTypes } from "sequelize";

const CommunityResource = (sequelize) => {
    return sequelize.define("CommunityResource", {
        ResourceID: {
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
        ContactInfo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Address: {
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

export default CommunityResource;