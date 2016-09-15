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
    /*
    *
    *   Creates a specific strategy to login with iphone.
    *   Not super secure, and could stand to refactor. 
    *
    */

    var l = req.body

    User
      .where('username', l.username)
      .fetch()
      .then(results => {
        if (results) {
          var user = results.toJSON();
        } else {
          res.json({user_id:0})
        }

        if (bcrypt.compareSync(l.password, user.password)) {
          res.json({user_id:user.id});
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
