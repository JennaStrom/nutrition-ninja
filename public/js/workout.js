
// https://share.balsamiq.com/c/4CSS9Qs6W1Bg4ZZLaoDwwm.png

const usdaApi = 'TYhLFom8tV8vr2nAANBpa1rT7xYFEzHdfTYrGSMT'


const apiNutritionIx = 'b390e29a58c8183e487d273f4488f5ef'
const appId = '85d6555d'

const foodAll = () =>{
    fetch ('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=' + usdaApi + '&query=chicken')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        // console.log(data.foods[0].finalFoodInputFoods[0].gramWeight + ' ' + data.foods[0].foodNutrients[0].unitName)
console.log("has a value of " + data.foods[0].foodNutrients[0].value)
        console.log(data.foods[0].description)
        console.log(data.foods[0].foodNutrients[0]. nutrientName )
        console.log(data.foods[0]. foodCategory)
        console.log()
        console.log()
     

        //     foods[0]. finalFoodInputFoods[0]. gramWeight
// foods[0].fdcId ?????????
// foods[0]. foodDescription
// foods[0]. finalFoodInputFoods[0]. portionCode
// foods[0]. finalFoodInputFoods[0]. Unit
// foods[0]. finalFoodInputFoods[0]. Value 
// foods[0]. foodCategory
// foods[0].foodCategoryId
// foods[0].foodNutrients[0]. nutrientName 
// foods[0].foodNutrients[0]. foodNutrientId 
// foods[0].foodNutrients[0]. nutrientId 
// foods[0].foodNutrients[0].nutrientNumber 
// foods[0].foodNutrients[0]. unitName
// foods[0].foodNutrients[0].value
    })


}

foodAll()


const getStarted = document.querySelector('#startButton') 

getStarted.addEventListener('click', async (event)=> {
    event.preventDefault();
await fetch('/workouts', {
        method: "GET",
        headers:  {
            'Content-Type': 'application/json'
        },
    })

})


const submitBtn = document.querySelector('#submitButton') //i think we can do form.

submitBtn.addEventListener('submit', ()=> {
    workout()
})

const workout = ()=>{

    const ageEl = document.getElementById('age') 
    const genderEl = document.getElementById('gender')
    const weightEl = document.getElementById('weight')
    const heightEl = document.getElementById('height')
    const workout_descriptionEl = document.getElementById('workoutDescription')

    const age = ageEl.value.trim()
    const gender = genderEl.value
    const weight = weightEl.value.trim()
    const height = heightEl.value.trim()
    const workout_description = workout_descriptionEl.value.trim()

    const workoutData = {
        age,
        gender,
        weight,
        height,
        workout_description
    }
     fetch('/workouts', {
        method: "POST",
        headers:  {
            // "x-app-id": appId,
            // "x-app-key": apiNutritionIx,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(workoutData) 
    })
    // if(response.ok) {
    //     document.location.replace('/dashboard')
    // } else {
    //     // use modal to inform user to try again (message)
    // }
    
}



// {
//     "query":"ran 3 miles",
//     "gender":"female",
//     "weight_kg":72.5,
//     "height_cm":167.64,
//     "age":30
//    }
// 


const workOut = ()=>{
    //     const form = document.querySelector('#workoutForm');
    
    //   form.addEventListener('submit', (event) => {
    //     event.preventDefault();
    // })
    
        fetch('https://trackapi.nutritionix.com/v2/natural/exercise', {
            method: "POST",
            headers:  {
                "x-app-id": appId,
                "x-app-key": apiNutritionIx,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                query:"i ran 3 miles",   //textarea
    gender:"female",
    weight_kg:62,
    height_cm:177,
    age:27
            }) //data that we have got from the user, like form
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log('calories_burnt ' + data.exercises[0].nf_calories)
            console.log('workout category_name: ' + data.exercises[0].name)
            console.log('metabolic equivalent of task (MET): ' + data.exercises[0].met)
            console.log('converted_duration in minutes: ' + data.exercises[0].duration_min)
            // console.log('all user inputs- age, weight, height, age, gender') //we can make it editable
          
            

            // anycode.........
            // WE MUST USE array methods to get all the calories and workout_name if the user entered more than 1
            // 'i ran 3 miles and walked 2 miles'- running, walking each has their own calories expended 
        })
        .catch(err => console.log(err))
    }
       workOut()
    