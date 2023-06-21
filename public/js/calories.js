


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
            <p class="met_description"><span>Name of exercise:</span> ${retrievedData.name}</p>
            <p class="met_description"><span>Your activity:</span> ${retrievedData.workout_description}</p>
            <p class="met_description"><span>Duration of your activity:</span> ${retrievedData.duration_min} minutes</p>
            <p class="met_description"><span id="calories_bgrd">Calories burned: ${retrievedData.nf_calories}</span></p>
            <p class="met_description"><span>MET:</span> ${retrievedData.met}</p>
            <p class="met_description"><span>Metabolic Equivalent (MET) is the rate of energy expended per 30 minutes.</span> </p>
          </div>
        </div>
      `;

      caloriesResultContainer.innerHTML += template;
   }



caloriesBtn.addEventListener('click', CalculatedCalories)






