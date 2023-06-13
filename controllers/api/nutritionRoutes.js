const foodAll = () =>
  fetch('/foods', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });