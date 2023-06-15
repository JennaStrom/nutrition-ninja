const router = require('express').Router();
const workoutRoutes = require('./workoutRoutes');
const nutritionRoutes = require('./nutritionRoutes');
const userRoutes = require('./userRoutes');
const loginRoute = require('./loginRoute');

router.use('/signup', userRoutes);
router.use('/login', loginRoute);
router.use('/workouts', workoutRoutes);
router.use('/nutrition', nutritionRoutes);

module.exports = router;
