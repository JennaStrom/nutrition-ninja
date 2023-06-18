const router = require('express').Router();
const workoutRoutes = require('./workoutRoutes');
const nutritionRoutes = require('./nutritionRoutes')
const caloriesRoutes = require('./caloriesRoute')

// all of these routes are prefixed with '/api'
router.use('/workouts', workoutRoutes);
router.use('/nutrition', nutritionRoutes);
router.use('/calories', caloriesRoutes);


module.exports = router;
