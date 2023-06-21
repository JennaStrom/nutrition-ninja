const router = require('express').Router();
const { Workout } = require('../models');
const withAuth = require('../utils/auth');

// GET route to render the user's profile page
router.get('/', withAuth, async (req, res) => {
  try {
    // Retrieve all saved workouts for the logged-in user
    const workouts = await Workout.findAll({
      where: { user_id: req.session.user_id },
    });
    console.log('findAll saved data: ', workouts)

    res.render('profile', {
      logged_in: true,
      workouts: workouts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the user profile' });
  }
});

// POST route to save a workout to the user's profile
router.post('/', async (req, res) => {
  try {
    const workoutData = req.body;
    console.log('workoutData:', workoutData);

    // Create the workout associated with the logged-in user
    const workout = await Workout.create({
      // Adjust the field names according to your Workout model
      name: workoutData.name,
      type: workoutData.type,
      muscle: workoutData.muscle,
      equipment: workoutData.equipment,
      difficulty: workoutData.difficulty,
      instructions: workoutData.instructions,
      user_id: req.session.user_id, // Assuming you have a user_id field in your Workout model
    });

    // Return a success response
    res.sendStatus(200);
  } catch (error) {
    // Log the error and return an error response
    console.error(error);
    res.sendStatus(500);
  }
});



//  delete a saved workout from the user's profile
router.delete('/workout/:id', withAuth, async (req, res) => {
  try {
    const workoutId = req.params.id;

    // Delete the workout associated with the logged-in user and the specified workoutId
    const deletedWorkout = await Workout.destroy({
      where: {
        id: workoutId,
        user_id: req.session.user_id,
      },
    });

    if (deletedWorkout === 0) {
      // No workout was deleted (invalid workoutId or not authorized)
      res.status(404).json({ message: 'Workout not found or you are not authorized to delete it' });
    } else {
      // Workout deleted successfully
      res.status(200).json({ message: 'Workout deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the workout' });
  }
});

module.exports = router;
