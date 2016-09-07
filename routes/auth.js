var express = require('express'),
  router = express.Router(),
  passport = require('passport');

router.route('/login')
  .post(passport.authenticate('local', {
    successRedirect:'/dashboard',
    failureRedirect:'/auth/fail'
  }))

router.route('/fail')
  .get((req, res) => {
    res.send('You suck.');
  })

module.exports = router;
