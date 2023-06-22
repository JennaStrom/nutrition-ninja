const router = require('express').Router();
const session = require('express-session');
const { User } = require('../models');

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

module.exports = router;