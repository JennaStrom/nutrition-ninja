document.addEventListener('DOMContentLoaded', () => {

  const profileContainer = document.getElementById('profileContainer');

  const savedWorkouts = JSON.parse(sessionStorage.getItem('savedWorkouts'));


  const showWorkoutButton = document.getElementById('show_workoutButton');
  showWorkoutButton.textContent = 'Show Workout data';

  // Variable to check the current status of the showButton
  let isShowingData = false;

  showWorkoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    isShowingData = !isShowingData;

    if (isShowingData) {
      showWorkoutButton.textContent = 'Hide Workout Data';
      profileContainer.style.display = 'block';
      profileContainer.innerHTML = '';

      if (savedWorkouts && savedWorkouts.length > 0) {
        savedWorkouts.forEach((workout, index) => {
          // Create the container for each workout
          const workoutContainer = document.createElement('div');
          workoutContainer.classList.add('workout-container');

          // Create the toggle button for the workout content
          const toggleButton = document.createElement('button');
          toggleButton.classList.add('datashow-toggle-button', 'button', 'is-success', 'is-outlined');
          toggleButton.textContent = `show ${workout.name}`;
          toggleButton.addEventListener('click', () => {
            workoutContent.classList.toggle('expanded');
            toggleButton.textContent = workoutContent.classList.contains('expanded') ? `Hide ${workout.name}` : `show ${workout.name}`;
          });

          // Create the content for the workout container
          const workoutContent = document.createElement('div');
          workoutContent.classList.add('workout-content', 'datashow-toggle-div');

          workoutContent.innerHTML = `
       <div class="box container is-fluid">
        <div class="notification is-success">
        <p><span>Name of exercise:</span> ${workout.name}</p>
         <p><span>Type of exercise:</span> ${workout.type}</p>
         <p><span>Muscle targeted:</span> ${workout.muscle}</p>
         <p><span>Equipment:</span> ${workout.equipment}</p>
         <p><span>Difficulty level:</span> ${workout.difficulty}</p>
          </div> 
         <p><span>Instructions to follow:</span> ${workout.instructions}</p>
       
        </div>
       `;

          // Hide the workout content initially
          workoutContent.style.display = 'none';

          // Append element to container
          workoutContainer.appendChild(toggleButton);
          workoutContainer.appendChild(workoutContent);
          profileContainer.appendChild(workoutContainer);

          // Attach event listener to the toggle button
          toggleButton.addEventListener('click', () => {
            const otherWorkoutContents = document.querySelectorAll('.workout-content');
            otherWorkoutContents.forEach((content, i) => {
              // check the index of the selected workout set 
              if (i !== index) {
                content.style.display = 'none';
                const otherToggleButtons = content.previousSibling.querySelectorAll('.datashow-toggle-button');
                otherToggleButtons.forEach((button) => {
                  button.textContent = `Show ${workout.name}`;
                });
              }
            });
            workoutContent.style.display = workoutContent.style.display === 'none' ? 'block' : 'none';
          });
        });
      }
    } else {

      showWorkoutButton.textContent = 'Show Workout Data';
      profileContainer.style.display = 'none';
    }
  });
  const savedNutrition = JSON.parse(sessionStorage.getItem('savedNutrition'));
  const savedNutritionContainer = document.getElementById('savedNutritionContainer');
  const showNutritionBtn = document.getElementById('show_nutriButton');

  showNutritionBtn.textContent = 'Show Nutrition Data';

  let isNutriDataShowing = false;

  showNutritionBtn.addEventListener('click', (event) => {
    event.preventDefault();

    isNutriDataShowing = !isNutriDataShowing;

    if (isNutriDataShowing) {
      showNutritionBtn.textContent = 'Hide Nutrition Data';
      savedNutritionContainer.style.display = 'block';
      savedNutritionContainer.innerHTML = '';

      savedNutrition.forEach((nutritionData) => {
        const template = `
       <div class="notification is-primary">
        <p>Name: ${nutritionData.name}</p>
        <p>Calories: ${nutritionData.calories}</p>
        <p>Protein: ${nutritionData.protein_g}</p>
        <p>Carbs: ${nutritionData.carbohydrates_total_g}</p>
        <p>Fat: ${nutritionData.fat_total_g}</p>
       </div>
      `;
        savedNutritionContainer.innerHTML += template;
      });
    } else {
      showNutritionBtn.textContent = 'Show Nutrition Data';
      savedNutritionContainer.style.display = 'none';
    }
  });

  savedNutritionContainer.style.display = 'none'
});