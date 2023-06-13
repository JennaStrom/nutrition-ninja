const sequelize = require('../config/connection');
const { Workout } = require('../models');

const workoutData = require('./workoutData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Workout.bulkCreate(workoutData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();