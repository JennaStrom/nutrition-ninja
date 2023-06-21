// document.addEventListener('DOMContentLoaded', () => {

//     const form = document.getElementById('nutritionForm');
//         form.addEventListener('submit', async (event) => {
//           event.preventDefault();
        
//           const formData = new FormData(form);
//           const requestBody = {}
//           for(let key of formData.entries()) {
//     const name = key[0]
//     const value =key[1]
//     requestBody[name] =value
//     console.log(key)
//           }
//           // const jsonBody = Object.fromEntries(formData);
//           try {
//             const response = await fetch('/api/nutrition', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(requestBody),
//             });
//             if (response.ok) {
//               const data = await response.json();
//               console.log(data)
//               renderNutritionResult(data);
//             } else {
//               throw new Error('Network error.');
//             }
//           } catch (error) {
//             // Use a modal to display the error message and inform the user to try again
//           }
//         });
        
//         // Function to render the workout result template
//         const renderNutritionResult = (data) => {
//             const template = `
//             <div class="notification is-primary">
//               <p>Name: ${data.name}</p>
//               <p>Calories: ${data.calories}</p>
//               <p>Protein: ${data.protein_g}</p>
//               <p>Carbs: ${data.carbohydrates_total_g}</p>
//               <p>Fat: ${data.fat_total_g}</p>
//             </div>
//             `;
          
//             document.getElementById('nutritionResultsContainer').innerHTML += template;
//           };
//     });



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
              <div class="notification is-primary">
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



















// const nutritionForm = document.querySelector('#nutrition-form');
// const resultContainer = document.querySelector('#result-container');


// const handleSubmit = async (event) => {
//     event.preventDefault();


//     const foodInput = document.querySelector('#food-input').value;

//     try {
//         const response = await fetch('/nutrition', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ food: foodInput })
//         });

//         if (response.ok) {

//             const data = await response.json();


//             displayNutritionData(data);
//         } else {
//             throw new Error('Request failed');
//         }
//     } catch (error) {
//         console.error(error);
//         resultContainer.textContent = 'An error occurred. Please try again later.';
//     }
// };


// const displayNutritionData = (data) => {
//     resultContainer.innerHTML = `
//     <h2>Nutrition Results</h2>
//     <p>name: ${data.name}</p>
//     <p>Calories: ${data.calories}</p>
//     <p>Protein: ${data.protein_g}</p>
//     <p>Carbs: ${data.carbohydrates_total_g}</p>
//     <p>Fat: ${data.fat_total_g}</p>
//   `;
// };


// nutritionForm.addEventListener('submit', handleSubmit);