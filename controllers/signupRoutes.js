// const router = require('express').Router();
// // const session = require('express-session');
// const { User } = require('../models');
// // const withAuth = require('../../utils/auth');


// router.post('/', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// module.exports = router;




const router = require('express').Router();
// const session = require('express-session');
const { User } = require('../models');
// const withAuth = require('../../utils/auth');

router.post('/', (req, res) => {
  User.create({
      username: req.body.username,
      password: req.body.password,
      gender: req.body.gender,
      weight: req.body.weight,
      height: req.body.height,
      age: req.body.age
  })
  .then(dbUser => {
      req.session.save(() => {
      req.session.user_id = dbUser.id;
      req.session.username = dbUser.username;
      req.session.loggedIn = true;
      res.json(dbUser);
      })
  })
  .catch(err => {
      console.log(err)
      res.status(500).json(err)
  })
})

// router.post('/signup', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
//       res.redirect('/profile');
//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;