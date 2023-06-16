
// https://share.balsamiq.com/c/4CSS9Qs6W1Bg4ZZLaoDwwm.png


// const apiNutritionIx = 'b390e29a58c8183e487d273f4488f5ef'
// const appId = '85d6555d'

// const apinewNinja = 'YnF77DgeIzx4abs3C/4mFw==V5wEdGttiBzNk6iO'


    // Function to fetch the workout form on page load
    // const fetchWorkoutForm = async () => {
    //   try {
    //     const res = await fetch('/api/workouts');
    //     const data = await res.text();
    //     document.getElementById('workoutFormContainer').innerHTML = data;
    //   } catch (err) {
    //     // Use a modal to display the error message and inform the user to try again
    //   }

document.addEventListener('DOMContentLoaded', () => {

const form = document.getElementById('workoutForm');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
    
      const formData = new FormData(form);
      const requestBody = {}
      for(let key of formData.entries()) {
const name = key[0]
const value =key[1]
requestBody[name] =value
console.log(key)
      }
      // const jsonBody = Object.fromEntries(formData);
      try {
        const response = await fetch('/api/workouts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          renderWorkoutResult(data);
        } else {
          throw new Error('Network error.');
        }
      } catch (error) {
        // Use a modal to display the error message and inform the user to try again
      }
    });
    
    // Function to render the workout result template
    const renderWorkoutResult = (data) => {
        const template = `
          <p>Type: ${data.type}</p>
          <p>Muscle: ${data.muscle}</p>
          <p>Equipment: ${data.equipment}</p>
          <p>Difficulty: ${data.difficulty}</p>
          <p>Instructions: ${data.instructions}</p>
        `;
      
        document.getElementById('workoutResultContainer').innerHTML += template;
      };
});
    
    // fetchWorkoutForm()
    
    // Event listener for form submission
    
      
    
    // })
    






        



























































        





















        

