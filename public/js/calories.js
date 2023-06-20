


const caloriesBtn = document.getElementById('caloriesButton')


const CalculatedCalories = async (event) => {
  // prevent the browser from refrsheing before we GET OUR DATA
  event.preventDefault();
  console.log("Calling Server API...")
  try {
 
    const workout_description = document.getElementById('workoutDescription').value.trim();
    const duration_min = document.getElementById('durationInMin').value.trim();

    const queryParams = {
      workout_description,
      duration_min,
    };

    console.log(queryParams)

   

    const response = await fetch('/api/calories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(queryParams),
    });

    if (response.ok) {
      retrievedData = await response.json();

      renderCaloriesResult(retrievedData);
    } else {
      throw new Error('Network error.');
    }

  } catch (err) {
    console.log(err);
  }
};


const renderCaloriesResult = () => {
  const caloriesResultContainer = document.getElementById('caloriesResultContainer');
 
    
      const template = `
        <div id="calories_div" class="box container is-fluid">
          <div class="notification is-primary">
            <p>Name of exercise: ${retrievedData.name}</p>
            <p>Calories burned: ${retrievedData.nf_calories}</p>
            <p>MET: ${retrievedData.met}</p>
            <p>Your activity: ${retrievedData.workout_description}</p>
            <p>Duration of your activity: ${retrievedData.duration_min} minutes</p>
          </div>
        </div>
      `;

      caloriesResultContainer.innerHTML += template;
   }



caloriesBtn.addEventListener('click', CalculatedCalories)






