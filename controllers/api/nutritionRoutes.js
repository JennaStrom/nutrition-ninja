const express = require('express');
const router = express.Router();
const Nutrition = require('../../models/nutrition');
const axios = require('axios');

const apiEndpoint2 = 'https://api.api-ninjas.com/v1/nutrition';
const apinewNinja2 = 'y0Xv/ascWow8jE7ZEojqeA==db1pQsgjws8x78bK'

router.get('/', (req, res) => {
  res.render('nutritionForm');
});

router.post('/', async (req, res) => {
  const { body } = req;

  const requestParams2 = {
    headers: {
      'X-Api-key': apinewNinja2,
    },
    params: {
      query: req.body.nutrition
    },
  };

  try {
    const response = await axios.get(apiEndpoint2, requestParams2);
    const data2 = response.data;

    const extractedData2 = data2;

    const userNutritionData = await Nutrition.bulkCreate(extractedData2);
    console.log(userNutritionData);

    if (userNutritionData) {
      res.json(extractedData2[0]);
    } else {
      res.status(400).json({ error: 'No nutrition data found' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
});
  
  module.exports = router;