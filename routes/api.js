var express = require('express'),
  router = express.Router(),
  bcrypt = require('bcrypt'),
  User = require('../models/user');

router.route('/users')
  .get((req, res) => {
    User.fetchAll().then(users => {
      res.send(users.toJSON());
    });
  })
  .post((req, res) => {
    var newUser = req.body,
        hash    = bcrypt.hashSync( newUser.password, 8);

    new User({
      username:newUser.username,
      email:newUser.email,
      avatar_url:newUser.avatar_url,
      full_name:newUser.full_name,
      password: hash,
      location:newUser.location
    }).save().then(() => {
      res.redirect('/');
    });
  });

router.route('/users/:user_id')
  .get((req, res) => {
    User
      .where('id', req.params.user_id)
      .fetch()
      .then( user => {
        res.json(user.toJSON());
      });
  });



module.exports = router;
