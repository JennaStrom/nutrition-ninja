const router = require('express').Router();
const { User, Calories } = require('../models');
// All routes in this file are prefixed with '/api/calories' ---I changed this so it's now /calories for the form and then it would go to /api/calories after the api is called
router.get('/', (req, res) => {
    console.log('this')
    res.render('caloriesForm')

})
// this ENDPOINT is /api/calories WITH POST HTTP method
router.post('/', async (req, res) => {
    console.log("Request Object: ", req.body);
    console.log("Session: ", req.session);
    // console.log("Current User: ", req.session.user_id);
    const apiEndpoint = 'https://trackapi.nutritionix.com/v2/natural/exercise';
    const apiWorkoutKey = 'b390e29a58c8183e487d273f4488f5ef';
    const appId = '85d6555d';
    const { workout_description, duration_min } = req.body;
    try {

        // const userData = await User.findOne({
        //     where: {
        //         user_id: req.session.user_id
        //     }
        // })
        const requestParams = {
            method: 'POST',
            headers: {
                'x-app-id': appId,
                'x-app-key': apiWorkoutKey,
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(
                parameters: {
                // age: userData.age,
                // gender: userData.gender,
                // weight: userData.weight,
                // height: userData.height,
                workout_description,
                duration_min,
            }
        }

        const response = await fetch(apiEndpoint, requestParams)
        const data = await response.json()
        //    const {exercises} = data
        console.log('api response:', data)
        const extractedResult = {
            // name: data.exercises.name,
            nf_calories: data.exercises[0].nf_calories,
            met: data.exercises[0].met
        }

        const newCalories = await Calories.create({
            workout_description: workout_description,
            duration_min: duration_min,
            // user_id: userData.id,
            // nf_calories: extractedResult.nf_calories,
            // met: extractedResult.met,
            extractedResult,
        })
        console.log(newCalories)
        if (newCalories) {
            res.render('caloriesResult', { newCalories })
        }
        else {
            res.status(400).json({ error: 'Failed to create new calories entry' })
        }

    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = router;