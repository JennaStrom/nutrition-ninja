

const caloriesBtn = document.getElementById('caloriesButton')


const CalculatedCalories = async (event) => {
  // prevent the browser from refrsheing before we GET OUR DATA
  event.preventDefault();
  console.log("Calling Server API...")
  try {
    // const usersResponse = await fetch('/users');
    // const userData = await usersResponse.json();

    // we may be able to just grab the USER ID from the REQ.SESSION OBJECT


    const workout_description = document.getElementById('workoutDescription').value.trim();
    const duration_min = document.getElementById('durationInMin').value.trim();

    const queryParams = {
      /*     age: userData.age,
           gender: userData.gender,
           weight: userData.weight,
           height: userData.height, */
      workout_description,
      duration_min,
    };

    console.log(queryParams)

    fetch('/api/calories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(queryParams),
    });
    

  } catch (err) {
    console.log(err);
  }
};



caloriesBtn.addEventListener('click', CalculatedCalories)