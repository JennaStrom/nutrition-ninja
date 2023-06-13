const Workout = require('../../models/workout');

const router = require('express').Router();

const apiEndpoint = 'https://trackapi.nutritionix.com/v2/natural/exercise'
const apiWorkoutKey = 'b390e29a58c8183e487d273f4488f5ef—'
const appId = '85d6555d'

router.get('/workouts', (req, res)=> {
    res.render('workoutForm')
})

router.post('/workouts', async (req, res) => {
const {age, gender, weight, height, workout_description} = req.body;



// for questions, then we'll get user's input value to fill the body ????
// user's answer smt like 'workout_description:,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'
// const userInput = await inquirer.prompt()

const requestParams = {
    method: "POST",
    headers: {

        "x-app-id": appId,
        "x-app-key": apiWorkoutKey,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        query:workout_description,
        gender:gender,
        weight_kg: weight,
        height_cm: height,
        age: age
    })
}
try {
     const fetchedData = await fetch(apiEndpoint, requestParams)
     const data = await fetchedData.json()
     
      const extractedData = data.exercise.map(exercise => ({
         nf_calories: exercise.nf_calories,
        met: exercise.met,
        duration_min: exercise.duration_min
      })) 
        
     const userWorkoutData = await Workout.create({...req.body, extractedData}) //do we need to list all data including the additional calories_burnt
    

     if(userWorkoutData) {
//  res.status(200).json(userWorkoutData)
// res.redirect('/dashboard')
 res.render('workoutResult', userWorkoutData)
     }
    res.status(400).json({'Error': err})

}
catch(error) {
    res.status(500).json({'Error': error})
}
})


        



   
