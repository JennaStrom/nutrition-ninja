const { Model, DataTypes, } = require('sequelize');
const sequelize = require('../config/connection');

class Nutrition extends Model { }

Nutrition.init(
    {

    }
);

module.exports = Nutrition;