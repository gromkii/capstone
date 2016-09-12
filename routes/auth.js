var express = require('express'),
  router = express.Router(),
  passport = require('passport');

router.route('/login')
  .post(passport.authenticate('local', {
    successRedirect:'/dashboard',
    failureRedirect:'/auth/fail'
  }))

router.route('/logout')
  .get((req, res) => {
    if (req.user){
      req.logout();
      res.redirect('/')
    } else {
      res.send(401);
      res.redirect('/');
    }
  })

router.route('/user')
  .get((req, res) => {
    if (req.user) {
      res.json(req.user)
    } else {
      res.send('No user found.')
    }

  })

router.route('/fail')
  .get((req, res) => {
    res.send('You suck.');
  })

module.exports = router;
