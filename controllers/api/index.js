const router = require('express').Router();
const workoutRoutes = require('./workoutRoutes');
const nutritionRoutes = require('./nutritionRoutes')

router.use('/workouts', workoutRoutes);
router.use('/nutriton', nutritionRoutes);

module.exports = router;
