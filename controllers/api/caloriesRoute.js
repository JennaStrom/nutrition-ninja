const router = require('express').Router();
const {User, Calories} = require('../../models/calories');



router.get('/calories', (req, res)=> {
    res.render('caloriesForm')
    
})

router.post('/calories', async(req, res)=> {

    const apiEndpoint = 'https://trackapi.nutritionix.com/v2/natural/exercise'
    const apiWorkoutKey = 'b390e29a58c8183e487d273f4488f5ef—'
const appId = '85d6555d'

    const {age, gender, weight, height, workout_description, duration_min} = req.body;

    try {
        
        const userData = await User.findOne({
            where: {
                user_id: req.user.id
            }
        })

        const  requestParams = {
            method: 'POST',
            headers: {
                'x-app-key': apiWorkoutKey,
                'x-app-id': appId,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                age: userData.age,
                gender: userData.gender,
                weight: userData.weight,
                height: userData.height,
                workout_description,
                duration_min,

            })
        }

        const response = await fetch(apiEndpoint, requestParams)
        const data = await response.json()

        const extractedResult = {
            name: data.name,
            nf_calories: data.nf_calories,
            met: data.met
        }

        const newCalories = await Calories.create({
            workout_description: workout_description,
            duration_min: duration_min,
            user_id: userData.id,
            extractedResult
        })

        if(newCalories) {
            res.render('caloriesResult', {newCalories})
        }
        res.status(400).json(err)
    }
    catch(error) {
        res.status(500).json(error)
    }
})