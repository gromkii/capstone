var express = require('express'),
  router = express.Router(),
  bcrypt = require('bcrypt'),
  knex = require('../db/knex'),
  User = require('../models/user'),
  Session = require('../models/session'),
  Application = require('../models/application');

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

router.route('/user/:user_id')
  .get((req, res) => {
    User
      .where('id', req.params.user_id)
      .fetch()
      .then( user => {
        res.json(user.toJSON());
      });
  });

router.route('/user/:user_id/sessions')
  .get((req, res) => {
    User
      .getSessions(req.params.user_id)
      .then( results => {
        var user = results.toJSON();

        res.json(user);
      })
  })

router.route('/sessions')
  .get((req, res) => {
    Session
      .fetchAll({ withRelated: ['users']})
      .then( sessions => {
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
      skill_level:s.skill_level,
      num_players:s.num_players
    }).save()
      .then(post => {
        var id = post.toJSON().id;
        res.redirect(`/dashboard/session/${id}`);
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

router.route('/application')
  .get((req, res) =>{
    Application
      .fetchAll()
      .then( results => {
        res.json(results)
      })
  })

  .post((req, res) => {
    var a = req.body;

    console.log(a);
    new Application({
      has_played:a.has_played,
      years_played:a.years_played,
      used_platform:a.used_platform,
      exp_level:a.exp_level,
      application:a.application
    }).save()
      .then( results => {
        console.log(results.toJSON());
      })
  })



module.exports = router;
