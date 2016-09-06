var express = require('express'),
  router = express.Router(),
  passport = require('passport');

router.route('/login')
  .post(passport.authenticate('local', {
    failureRedirect: '/auth/login'
  }), (req, res) => {
    res.send('You did it.');
  });

module.exports = router;
