
// https://share.balsamiq.com/c/4CSS9Qs6W1Bg4ZZLaoDwwm.png


// const apiNutritionIx = 'b390e29a58c8183e487d273f4488f5ef'
// const appId = '85d6555d'

// const apinewNinja = 'YnF77DgeIzx4abs3C/4mFw==V5wEdGttiBzNk6iO'


    

document.addEventListener('DOMContentLoaded', () => {
  let retrievedData = [];
  let indexNow = 0;
  const form = document.getElementById('workoutForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const requestBody = {};
    for (let key of formData.entries()) {
      const name = key[0];
      const value = key[1];
      requestBody[name] = value;
    }

    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        retrievedData = await response.json();
        indexNow = 0;
        renderWorkoutResult();
      } else {
        throw new Error('Network error.');
      }
    } catch (error) {
      // Use a modal to display the error message and inform the user to try again
    }
  });

  const renderWorkoutResult = () => {
    const lastIndex = Math.min(indexNow + 3, retrievedData.length);
    const workoutResultContainer = document.getElementById('workoutResultContainer');
    const buttonContainer = document.getElementById('buttonContainer');

    for (let i = indexNow; i < lastIndex; i++) {
      let template = `
        <div id="each_div" class="box">
          <p>Name of exercise: ${retrievedData[i].name}</p>
          <p>Type of exercise: ${retrievedData[i].type}</p>
          <p>Muscle targeted: ${retrievedData[i].muscle}</p>
          <p>Equipment: ${retrievedData[i].equipment}</p>
          <p>Difficulty level: ${retrievedData[i].difficulty}</p>
          <p>Instructions to follow: ${retrievedData[i].instructions}</p>
        </div>
      `;

      workoutResultContainer.innerHTML += template;
    }

    if (lastIndex < retrievedData.length) {
      const nextButton = document.createElement('button');
      nextButton.id = 'nextButton';
      nextButton.textContent = 'Next';
      buttonContainer.innerHTML = '';
      buttonContainer.appendChild(nextButton);
    } else {
      buttonContainer.innerHTML = '';
    }
  };

  document.getElementById('buttonContainer').addEventListener('click', async (event) => {
    if (event.target.id === 'nextButton') {
      indexNow += 3;
      renderWorkoutResult();
    }
  });
  
});





        



























































        





















        

