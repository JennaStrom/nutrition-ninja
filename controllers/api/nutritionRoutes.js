const express = require('express');
const router = express.Router();
const Nutrition = require('../../models/nutrition');
const axios = require('axios');

const apiEndpoint2 = 'https://api.api-ninjas.com/v1/nutrition?query=';
const apinewNinja2 = 'y0Xv/ascWow8jE7ZEojqeA==db1pQsgjws8x78bK'

router.get('/', (req, res) => {
  res.render('nutritionForm');
});

router.post('/', async (req, res) => {
  const { body } = req;

  // console.log(body);
  const query = body.name;
  const requestParams2 = {
    headers: {
      'X-Api-key': apinewNinja2,
    },
    // params: {
    //   name: body.name,
    // },
  };

  try {
    console.log(requestParams2);
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/nutrition?query=${query}`,
      requestParams2
    );
    const data2 = response.data;

    console.log({ data2 });

    const extractedData2 = data2;

    const userNutritionData = await Nutrition.bulkCreate(extractedData2);
    console.log(userNutritionData);

    if (userNutritionData) {
      res.json(extractedData2[0]);
    } else {
      res.status(400).json({ error: 'No nutrition data found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  
  module.exports = router;
  //   try {
  //     const response = await axios.get(apiEndpoint2, requestParams2);
  //     const data2 = response.data;
  
  //     const extractedData2 = [];
  //     // let extractedResult
  //     for (let i = 0; i < 2 && i < data.length; i++) {
  //      let extractedResult2 = {
  //         name: data2[i].name,
  //         calories: data2[i].calories,
  //         protein: data2[i].protein_g,
  //         carbs: data2[i].carbohydrates_total_g,
  //         fat: data2[i].fat_total_g,
  //       };
    
  //       extractedData2.push(extractedResult2);
  //     }
  // // console.log(extractedResult)
  //     const userNutritionData = await Nutrition.bulkCreate(extractedData2);
  // console.log(userNutritionData)
  //     if (userNutritionData) {
  //       res.json(extractedData2[0]);
  //     } else {
  //       res.status(400).json({ error: 'No nutrition data found' });
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // });



  

// router.post('/', (req, res) => {
//   try {
//     const { food } = req.body;

//     const url = `https://api.api-ninja.com/v1/nutrition?query=${food}`;
//     const options = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Api-Key': 'YnF77DgeIzx4abs3C/4mFw==V5wEdGttiBzNk6iO',
//       },
//     };

//     fetch(url, options)
//       .then((apiResponse) => apiResponse.json())
//       .then((data) => {
//         const { calories, protein, carbs, fat } = data;
//         res.render('nutritionResults', { food, calories, protein, carbs, fat });
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).send('Server Error');
//       });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });