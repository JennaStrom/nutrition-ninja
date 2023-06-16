const { Model, DataTypes, } = require('sequelize');
const sequelize = require('../config/connection');

class Workout extends Model { }

Workout.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        muscle: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        equipment: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        difficulty: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        instructions: {
            type: DataTypes.TEXT,
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
        modelName: 'workout',
    }

);

module.exports = Workout;


