const router = require('express').Router();
const workoutRoutes = require('./workoutRoutes');
const nutritionRoutes = require('./nutritionRoutes')
// const caloriesRoutes = require('./caloriesRoutes')

router.use('/workouts', workoutRoutes);
router.use('/nutriton', nutritionRoutes);
// router.use('/calories', caloriesRoutes);

module.exports = router;
