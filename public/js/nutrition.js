const nutritionForm = document.querySelector('#nutrition-form');
const resultContainer = document.querySelector('#result-container');


const handleSubmit = async (event) => {
    event.preventDefault();


    const foodInput = document.querySelector('#food-input').value;

    try {
        const response = await fetch('/nutrition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ food: foodInput })
        });

        if (response.ok) {

            const data = await response.json();


            displayNutritionData(data);
        } else {
            throw new Error('Request failed');
        }
    } catch (error) {
        console.error(error);
        resultContainer.textContent = 'An error occurred. Please try again later.';
    }
};


const displayNutritionData = (data) => {
    resultContainer.innerHTML = `
    <h2>Nutrition Results</h2>
    <p>Food: ${data.food}</p>
    <p>Calories: ${data.calories}</p>
    <p>Protein: ${data.protein}</p>
    <p>Carbs: ${data.carbs}</p>
    <p>Fat: ${data.fat}</p>
  `;
};


nutritionForm.addEventListener('submit', handleSubmit);