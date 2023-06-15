

const caloriesLinkEl = document.getElementById('caloriesLink')


const CalculatedCalories = async ()=>{
    

    try {
        const usersResponse = await fetch('/users')
        const userData = await usersResponse.json()

        const workout_description = document.getElementById('workoutDescription').value.trim()
        const duration_min = document.getElementById('durationInMin').value.trim()
   

    const queryParams = {
       age: userData.age,
        gender: userData.gender,
        weight: userData.weight,
        height: userData.height,
        workout_description,
        duration_min,
    }
   
  fetch('/calories', {
        method: "POST",
        headers:  {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(queryParams) 
    })
    
      }
      catch(err) {
        console.log(err)
      }
}


caloriesLinkEl.addEventListener('click', CalculatedCalories)