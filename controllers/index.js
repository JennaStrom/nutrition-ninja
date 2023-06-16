const router = require('express').Router();
const signupRoutes = require('./signupRoutes');
const loginRoute = require('./loginRoute');

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
router.use('/signup', signupRoutes);
router.use('/login', loginRoute);

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;

