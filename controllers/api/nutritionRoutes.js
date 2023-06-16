// const foodAll = () =>
//   fetch('/foods', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', (req, res) => {
  res.render('nutritionResults');
});

router.post('/', (req, res) => {
  try {
    const { food } = req.body;

    const url = `https://api.api-ninja.com/v1/nutrition?query=${food}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'YnF77DgeIzx4abs3C/4mFw==V5wEdGttiBzNk6iO',
      },
    };

    fetch(url, options)
      .then((apiResponse) => apiResponse.json())
      .then((data) => {
        const { calories, protein, carbs, fat } = data;
        res.render('nutritionResults', { food, calories, protein, carbs, fat });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Server Error');
      });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;