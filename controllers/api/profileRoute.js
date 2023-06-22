// const withAuth = require('../utils/auth');
// const {Workout} = require('../../models');

// router.get('/', withAuth, async (req, res) => {
//   try {
//     // Retrieve saved workouts for the logged-in user
//     const savedWorkouts = await Workout.findAll({
//       where: { user_id: req.session.user_id },
//     });

//     res.render('profile', {
//       logged_in: true,
//       workouts: savedWorkouts,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while retrieving saved workouts' });
//   }
// });

// module.exports = router;
