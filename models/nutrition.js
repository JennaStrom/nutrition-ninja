const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Nutrition extends Model { }

Nutrition.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        food: {
            type: DataTypes.STRING,
            allowNull: false
        },
        calories: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        protein: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carbs: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fat: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'nutrition'
    }
);

module.exports = Nutrition;