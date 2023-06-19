
// https://share.balsamiq.com/c/4CSS9Qs6W1Bg4ZZLaoDwwm.png


document.addEventListener('DOMContentLoaded', () => {
  const formContainer = document.getElementById('workoutFormContainer')
  formContainer.style.display = 'none'


  const starterBtn = document.getElementById('starterButton')
  starterBtn.addEventListener('click', (e) => {
    e.preventDefault()
    formContainer.style.display = 'block'
    starterBtn.style.display = 'none'

  })

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
        renderWorkoutResult(retrievedData);
      } else {
        throw new Error('Network error.');
      }
    } catch (error) {
      console.error(error)
    }
  });

  const renderWorkoutResult = () => {
    const lastIndex = Math.min(indexNow + 3, retrievedData.length);
    const workoutResultContainer = document.getElementById('workoutResultContainer');
    const buttonContainer = document.getElementById('buttonContainer');

    // Clear previous results
    workoutResultContainer.innerHTML = '';

    for (let i = indexNow; i < lastIndex; i++) {
      const template = `
        <div id="each_div_${i}" class="box container is-fluid">
          <div class="notification is-primary">
            <p>Name of exercise: ${retrievedData[i].name}</p>
            <p>Type of exercise: ${retrievedData[i].type}</p>
            <p>Muscle targeted: ${retrievedData[i].muscle}</p>
            <p>Equipment: ${retrievedData[i].equipment}</p>
            <p>Difficulty level: ${retrievedData[i].difficulty}</p>
          </div>
          <div id="instruction_toggle_${i}" class="instruction-toggle">
            <p class="instruction-toggle-content">Instructions to follow: ${retrievedData[i].instructions}</p>
            <button class="instruction-toggle-button button is-primary is-outlined">Show Instructions</button>
          </div>
        </div>
      `;

      workoutResultContainer.innerHTML += template;
    }

    const toggleInstructions = () => {
      const instructionToggleContents = document.querySelectorAll('.instruction-toggle-content');
      const instructionToggleButton = document.querySelectorAll('.instruction-toggle-button');

      instructionToggleButton.forEach((button, index) => {
        button.addEventListener('click', () => {
          instructionToggleContents[index].classList.toggle('expanded');
          button.textContent = instructionToggleContents[index].classList.contains('expanded') ? 'Hide Instructions' : 'Show Instructions';
        });
      });
    };

    toggleInstructions();


    // Clear previous buttons
    buttonContainer.innerHTML = '';

    if (lastIndex < retrievedData.length) {
      const backButton = document.createElement('button');
      backButton.id = 'backButton';

      backButton.textContent = 'Back';
      backButton.classList.add('block', 'button', 'is-info', 'is-outlined')

      const nextButton = document.createElement('button');
      nextButton.id = 'nextButton';
      nextButton.textContent = 'Next';
      nextButton.classList.add('block', 'button', 'is-info', 'is-outlined')

      buttonContainer.appendChild(backButton);
      buttonContainer.appendChild(nextButton);
    } else {
      const backButton = document.createElement('button');
      backButton.id = 'backButton';
      backButton.textContent = 'Back';

      buttonContainer.appendChild(backButton);
      backButton.classList.add('block', 'button', 'is-info', 'is-outlined')
    }
  };

  document.getElementById('buttonContainer').addEventListener('click', async (event) => {
    if (event.target.id === 'nextButton') {
      indexNow += 3;
      renderWorkoutResult();
    } else if (event.target.id === 'backButton') {
      indexNow -= 3;
      if (indexNow < 0) {
        indexNow = 0;
      }
      renderWorkoutResult();
    }
  });

});

























































































