const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const gender = document.querySelector('#gender').value;
    const weight = document.querySelector('#weight').value.trim();
    const height = document.querySelector('#height').value.trim();
    const age = document.querySelector('#age').value.trim();

    if (username && password && gender && weight && age) {
        console.log({ username, password, gender, weight, height, age })
        
        const response = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password, gender, weight, height, age }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to log in');
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);