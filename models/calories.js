
const { Model, DataTypes, } = require('sequelize');
const sequelize = require('../config/connection');

class Calories extends Model { }

Calories.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,

        },
    
        workout_description: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        nf_calories: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        met: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        duration_min: {
type: DataTypes.INTEGER,
allowNull: true,

        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'user',
        //         key: 'id',
        //     },

        // },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'calories',
    }

);

module.exports = Calories;


