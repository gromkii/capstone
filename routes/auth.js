var express = require('express'),
  router = express.Router(),
  passport = require('passport')
  User = require('../models/user')
  bcrypt = require('bcrypt');

router.route('/login')
  .post(passport.authenticate('local', {
    successRedirect:'/dashboard',
    failureRedirect:'/auth/fail'
  }))

router.route('/iphone/login')
  .post((req, res) => {
    var l = req.body

    User
      .where('username', l.username)
      .fetch()
      .then(results => {
        var user = results ? results.toJSON() : {user_id:0}

        if (bcrypt.compareSync(l.password, user.password)) {
          res.json({user_id:user.id});
        } else {
          res.json({user_id:0});
        }
      })
  });

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
      res.json({
        id:0
      });
    }

  })

router.route('/fail')
  .get((req, res) => {
    res.send('You suck.');
  })

module.exports = router;
