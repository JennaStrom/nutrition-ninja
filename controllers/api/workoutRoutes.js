require('dotenv').config();
const express = require('express');
const router = express.Router();
const Workout = require('../../models/workout');
const axios = require('axios');
const withAuth = require('../../utils/auth');

const apiEndpoint = 'https://api.api-ninjas.com/v1/exercises';
const apinewNinja = process.env.WORKOUT_API_KEY;;

// GET route to render the workout form
router.get('/', withAuth, (req, res) => {
  res.render('workoutForm', {
    logged_in: true
  });
});


// GET route to handle form submission and retrieve workout data from the third-party API
router.post('/', withAuth, async (req, res) => {
  const { body } = req;

  const requestParams = {
    headers: {
      'X-Api-Key': apinewNinja,
    },
    params: {
      muscle: body.muscle,
      difficulty: body.difficulty,
    },
  };

  try {
    const response = await axios.get(apiEndpoint, requestParams);
    const data = response.data;

    let extractedData = [];
    for (let i = 0; i < data.length; i++) {

      let extractedResult = {
        name: data[i].name,
        type: data[i].type,
        muscle: data[i].muscle,
        equipment: data[i].equipment,
        difficulty: data[i].difficulty,
        instructions: data[i].instructions,
      };

      extractedData.push(extractedResult);
    }
    const userWorkoutData = await Workout.bulkCreate(extractedData);
    console.log(userWorkoutData)

    if (userWorkoutData) {

      res.status(200).json(userWorkoutData)

    } else {
      res.status(400).json({ error: 'No workout data found' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;





