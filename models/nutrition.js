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
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        calories: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        protein: {
            type: DataTypes.FLOAT,
            allowNull: true,
            field: 'protein_g'
        },
        carbs: {
            type: DataTypes.FLOAT,
            allowNull: true,
            field: 'carbohydrates_total_g'
        },
        fat: {
            type: DataTypes.FLOAT,
            allowNull: true,
            field: 'fat_total_g'
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