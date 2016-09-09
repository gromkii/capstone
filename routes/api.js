var express = require('express'),
  router = express.Router(),
  bcrypt = require('bcrypt'),
  User = require('../models/user'),
  Session = require('../models/session');

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

router.route('/users/:user_id/sessions')
  .get((req, res) => {
    User
      .where('id', req.params.user_id)
      .fetch({withRelated: ['sessions']})
      .then (user => {
        user = user.toJSON();
        res.json(user);
      })
  })

router.route('/sessions')
  .get((req, res) => {
    Session
      .fetchAll({ withRelated: ['users']})
      .then( sessions => {
        console.log(sessions.toJSON());
        res.json(sessions);
      });
  })
  .post((req, res) => {
    var s = req.body;
    new Session({
      session_name:s.session_name,
      game_name:s.game_name,
      session_desc:s.session_desc,
      header_url:s.header_url,
      start_date:s.start_date,
      runtime:s.runtime,
      skill_level:s.skill_level
    }).save()
      .then(() => {
        res.send('You did the thing.');
      })
  });

router.route('/session/:session_id')
  .get((req, res) => {
    Session
      .where("id", req.params.session_id)
      .fetch({withRelated: ['users']})
      .then( session => {
        session = session.toJSON();
        res.json(session);
      })
  })



module.exports = router;
