const router = require('express').Router();
const {User, Calories} = require('../../models');
const withAuth = require('../../utils/auth');
const fetch = require('node-fetch')

// All routes in this file are prefixed with '/api/calories'
router.get('/', withAuth, (req, res)=> {
    res.render('caloriesForm', {
        logged_in: true
    })
    
})

// this ENDPOINT is /api/calories WITH POST HTTP method
router.post('/', withAuth, async(req, res)=> {
    console.log("Request Object: ", req.body);
    console.log("Session: ", req.session);
   
    const apiEndpoint = 'https://trackapi.nutritionix.com/v2/natural/exercise'
    const apiCaloriesKey = process.env.CALORIES_API_KEY;
    const appId = process.env.CALORIES_API_APPID;

           
    const { workout_description, duration_min} = req.body;
    
    try {
        
        const userData = await User.findOne({
            where: {
                id: req.session.user_id
            }
        })
        console.log("Database Query: ", userData);
        if(userData) {
            let user = await userData.get({ plain: true });
            console.log("Serialized User Data: ", user);
        }
        
        const { age, gender, weight, height } = userData.dataValues;
        console.log("Dataset: ", age, gender, weight, height );

        let jsonData = {
            query: workout_description,
            gender: gender,
            weight_kg: weight,
            height_cm: height,
            age: age
        }

        const  requestParams = {
            method: 'POST',
            headers: {
                'x-app-id': appId,
                'x-app-key': apiCaloriesKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
         
        }
        
        const response = await fetch(apiEndpoint, requestParams)
        const data = await response.json()

        console.log('api response:', data)

        const extractedResult = {
            name: data.exercises[0].name,
            nf_calories: data.exercises[0].nf_calories,
            met: data.exercises[0].met
        }
        
console.log('extracted result: ', extractedResult)

        const newCalories = await Calories.create({
            workout_description: workout_description,
            duration_min: duration_min,
            nf_calories: extractedResult.nf_calories,
            name:extractedResult.name,
            met: extractedResult.met,
            
        })
console.log('New calorie data created: ', newCalories)

        if(newCalories) {
            res.status(200).json(newCalories)
        }
        else {
            res.status(400).json({error: 'Failed to create new calories entry'})
        }
        
    }
    catch(error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})
    }
})

module.exports = router;



