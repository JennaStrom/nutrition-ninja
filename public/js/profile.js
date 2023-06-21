


document.addEventListener('DOMContentLoaded', () => {

    const showDataContainer = document.getElementById('showSavedDataContainer');
    const profileContainer = document.getElementById('profileContainer');

    const savedWorkouts = JSON.parse(sessionStorage.getItem('savedWorkouts'));
  
    const showButton = document.createElement('button');
    showButton.id = 'showButton';
    showButton.textContent = 'Show saved data';
    showDataContainer.appendChild(showButton);
  
    // Variable to check the current status of the showButton
    let isShowingData = false; 
  
    showButton.addEventListener('click', (e) => {
      e.preventDefault();
      isShowingData = !isShowingData; 
  
      if (isShowingData) {
        showButton.textContent = 'Hide saved data';
        profileContainer.style.display = 'block';
        profileContainer.innerHTML = ''; /
  
        if (savedWorkouts && savedWorkouts.length > 0) {
          savedWorkouts.forEach((workout, index) => {
            // Create the container for each workout
            const workoutContainer = document.createElement('div');
            workoutContainer.classList.add('workout-container');
  
            // Create the toggle button for the workout content
            const toggleButton = document.createElement('button');
            toggleButton.classList.add('datashow-toggle-button', 'button', 'is-primary', 'is-outlined');
            toggleButton.textContent = 'Show this data';
            toggleButton.addEventListener('click', () => {
              workoutContent.classList.toggle('expanded');
              toggleButton.textContent = workoutContent.classList.contains('expanded') ? 'Hide this data' : 'Show this data';
            });
  
            // Create the content for the workout container
            const workoutContent = document.createElement('div');
            workoutContent.classList.add('workout-content', 'datashow-toggle-div');
           
            workoutContent.innerHTML = `
            <div class="box container is-fluid">
              <div class="notification is-primary">
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
                    button.textContent = 'Show this data'; 
                  });
                }
              });
              workoutContent.style.display = workoutContent.style.display === 'none' ? 'block' : 'none';
            });
          });
        }
      } else {

        
        showButton.textContent = 'Show saved data';
        showButton.classList.add()
        profileContainer.style.display = 'none';
      }
    });
  });
  