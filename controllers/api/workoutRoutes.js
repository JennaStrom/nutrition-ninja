

const router = require('express').Router();
const Workout = require('../../models/workout');
// const apiEndpoint = 'https://trackapi.nutritionix.com/v2/natural/exercise'
// const apiWorkoutKey = 'b390e29a58c8183e487d273f4488f5ef—'
// const appId = '85d6555d'



router.get('/', (req, res) => {
    // console.log('hi')
    // return res.json()
    res.render('workoutForm')
})

router.post('/', async (req, res) => {
    const { body } = req;

    const apiEndpoint = 'https://api.api-ninjas.com/v1/exercises'
    const apinewNinja = 'YnF77DgeIzx4abs3C/4mFw==V5wEdGttiBzNk6iO'

    const requestParams = {
        method: "POST",
        headers: {

            "x-app-key": apinewNinja,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            muscle: body.muscle,
            type: body.type,
            name: body.name,
            difficulty: body.difficulty,
        })
    }
    try {
        const response = await fetch(apiEndpoint, requestParams)
        const data = await response.json()

        const extractedData =[]

        for (let i = 0; i < 2 && i<data.length; i++) {

const extractedResult = {
            name: data[i].name,
            type: data[i].type,
            muscle: data[i].muscle,
            equipment: data[i].equipment,
            difficulty: data[i].difficulty,
            instructions: data[i].instructions
        }
      extractedData.push(extractedResult)

        }

        const userWorkoutData = await Workout.create({ ...req.body, ...extractedData }) //do we need to list all data including the additional calories_burnt


        if (userWorkoutData) {
            //  res.status(200).json(userWorkoutData)
            // res.redirect('/dashboard')
            res.render('workoutResult', {userWorkoutData})
        }
        res.status(400).json({ 'Error': err })

    }
    catch (error) {
        res.status(500).json({ 'Error': error })
    }
})



module.exports = router;



