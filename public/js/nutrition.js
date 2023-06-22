

document.addEventListener('DOMContentLoaded', () => {


document.addEventListener('DOMContentLoaded', () => {

      const form = document.getElementById('nutritionForm');
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
              </div>
              `;
            
              document.getElementById('nutritionResultsContainer').innerHTML += template;
            };
      });































