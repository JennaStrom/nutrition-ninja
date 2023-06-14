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

router.get('/nutrition', (req, res) => {
  res.render('nutritionForm');
});

router.post('/nutrition', (req, res) => {
  try {
    const { food } = req.body;

    const url = `https://api.api-ninja.com/v1/nutrition?food=${food}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '!!!API KEY!!!',
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