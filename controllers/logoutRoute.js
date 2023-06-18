const router = require('express').Router();

router.get('/', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      // res.status(204).end();
      res.redirect('/login')
    });
  } else {
    res.redirect('/login')
  }
});

module.exports = router;