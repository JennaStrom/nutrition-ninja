

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('nutritionForm');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const requestBody = {}
    for (let key of formData.entries()) {
      const name = key[0]
      const value = key[1]
      requestBody[name] = value
      console.log(key)
    }
    // const jsonBody = Object.fromEntries(formData);
    try {
      const response = await fetch('/api/nutrition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        renderNutritionResult(data);
      } else {
        throw new Error('Network error.');
      }
    } catch (error) {
      // Use a modal to display the error message and inform the user to try again
    }
  });

  // Function to render the workout result template
  const renderNutritionResult = (data) => {
    const template = `
              <div id="nutritionContent_div" class="column is-half notification is-primary">
                <p>Name: ${data.name}</p>
                <p>Calories: ${data.calories}</p>
                <p>Protein: ${data.protein_g}</p>
                <p>Carbs: ${data.carbohydrates_total_g}</p>
                <p>Fat: ${data.fat_total_g}</p>

                <button data-index="0" class="save_Button button is-dark is-outlined">Save</button>
              </div>
              `;

    document.getElementById('nutritionResultsContainer').innerHTML += template;

    const save_Btn = document.querySelectorAll('.save_Button');
    save_Btn.forEach((button) => {
      button.addEventListener('click', () => {
      
        const nutritionData = data;

        if (nutritionData) {
          // Save the nutrition data to sessionStorage
          const savedNutrition = JSON.parse(sessionStorage.getItem('savedNutrition')) || [];
          savedNutrition.push(nutritionData);
          sessionStorage.setItem('savedNutrition', JSON.stringify(savedNutrition));
       
        } else {
          throw new Error('Something went wrong to save this nutrition data');
        }
        



      });
    });
  };
});































