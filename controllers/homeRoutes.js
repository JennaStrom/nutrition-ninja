const router = require('express').Router();
const { User, Workout, Nutrition, Calories } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
	res.render('homepage')

});

router.get('/signup', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/profile');
		return;
	}
	res.render('signup');
});

router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/profile');
		return;
	}

	res.render('login');
});

router.get('/profile', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: {
				exclude: ['password']
			},
			// include: [{
			// 	model: { User }
			// }],
		});

		const user = userData.get({
			plain: true
		});
console.log("user", user)
		res.render('profile', {
			user,
			logged_in: true
		});
	} catch (err) {
		console.log('==error:', err)
		res.status(500).json(err);
	}
});


module.exports = router;
