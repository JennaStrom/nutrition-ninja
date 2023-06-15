const router = require('express').Router();
const { User, Workout, Nutrition } = require('../models');
const withAuth = require('../utils/auth');

router.get('/signUp', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/'); 
		return;
	}
	res.render('signUp');
});

router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	}

	res.render('login');
});

router.get('/', withAuth, async (req, res) => {
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

		res.render('home', {
			...user,
			logged_in: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});


module.exports = router;