

fetch('/api/user/activity')
    .then(response => response.json())
    .then(data => {
      
      const workoutContainer = document.getElementById('workoutContainer');
      workoutContainer.innerHTML = ''; 

    //  for loop wrapping this block of codes: data.workou....
        const workoutEl = document.createElement('div');
        workoutEl.textContent = ` Difficulty: ${workout.difficulty}, ..............`;
        workoutContainer.appendChild(workoutEl);
     
    })