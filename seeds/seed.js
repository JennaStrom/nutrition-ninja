const sequelize = require('../config/connection');
const { Workout, Nutrition, Calories, User } = require('../models');

const workoutData = require('./workoutData.json');
const nutritionData = require('./nutritionData.json')
const calorieData = require('./calorieData.json')
const userData = require('./userData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Workout.bulkCreate(workoutData, {
    individualHooks: true,
    returning: true,
  });
  await Nutrition.bulkCreate(nutritionData, {
    individualHooks: true,
    returning: true,
  });
  await Calories.bulkCreate(calorieData, {
    individualHooks: true,
    returning: true,
  });
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();