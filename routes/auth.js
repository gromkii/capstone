var express = require('express'),
  router = express.Router(),
  passport = require('passport');

router.route('/login')
  .post(passport.authenticate('local', {
    failureRedirect: '/auth/failure'
  }), (req, res) => {
    console.log(req.body);
    res.redirect('/auth/succ');
  });

router.route('/failure')
  .get((req,res) => {
    res.send('Fcuk.');
  })

router.route('/succ')
  .get((req, res) => {
    res.send('gj')
  })

module.exports = router;
