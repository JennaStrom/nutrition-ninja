const router = require('express').Router();
const { User, Workout, Nutrition } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
	res.render('homepage')

});

router.get('/signup', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	}
	res.render('signup');
});

router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	}

	res.render('login');
});
//change to /profile? Where are we sending them after they login
router.get('/dashboard', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: {
				exclude: ['password']
			},
			include: [{
				model: Blog
			}],
		});

		const user = userData.get({
			plain: true
		});

		res.render('', {
			...user,
			logged_in: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});


module.exports = router;
