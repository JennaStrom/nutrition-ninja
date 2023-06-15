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
<<<<<<< HEAD
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        muscle: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        equipment: {
=======
        workout_name: {
>>>>>>> d0de8c20bea2446821d4314cb1fa6a8b19fab568
            type: DataTypes.STRING,
            allowNull: true,

        },
<<<<<<< HEAD
        difficulty: {
=======
        workout_query: {
            type: DataTypes.STRING,
        },
        duration_min: {
            type: DataTypes.INTEGER,
        }
        ,
        nf_calories: {
>>>>>>> d0de8c20bea2446821d4314cb1fa6a8b19fab568
            type: DataTypes.INTEGER,
            allowNull: false,

        },
<<<<<<< HEAD
        instruction: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'user',
        //         key: 'id',
        //     },

        // },
=======
        met: {

        }
        ,
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },

        },
>>>>>>> d0de8c20bea2446821d4314cb1fa6a8b19fab568
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


