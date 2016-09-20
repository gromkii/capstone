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

    User.forge({
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

router.route('/user/:user_id/sessions/host')
  .get((req, res) => {
    var user = req.user ? req.user.id : req.body.user_id;

    if (user) {
      Session
        .where('host_id', user)
        .fetchAll({withRelated:['users','applications.users']})
        .then( results => {
          var sessions = results.toJSON();

          res.json(sessions);
        })
    } else {
      res.json({error:'Not Logged In'})
    }
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
    var s    = req.body,
        host = req.user ? req.user.id : req.body.user_id;
    Session.forge({
      session_name:s.session_name,
      game_name:s.game_name,
      session_desc:s.session_desc,
      header_url:s.header_url,
      start_date:s.start_date,
      runtime:s.runtime,
      skill_level:s.skill_level,
      num_players:s.num_players,
      host_id:host
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
      .fetch({withRelated: ['users','host']})
      .then( session => {
        session = session.toJSON();
        res.json(session);
      })
  })
  .delete((req, res) => {
    Session
      .where('id', req.params.session_id)
      .destroy()
      .then( results => {
        console.log(results.toJSON());
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

    new Application({
      has_played:a.has_played,
      years_played:a.years_played,
      used_platform:a.used_platform,
      exp_level:a.exp_level,
      application:a.application
    }).save()
      .then( results => {

        var r    = results.toJSON().id,
            user = req.user ? req.user.id : req.body.user;
        knex('approve_applications').insert({
          app_id:r,
          session_id:a.session_id,
          applicant_id: parseInt(user)
        }).then(() => {

          res.redirect('/dashboard');
        })
      })
  })

router.route('/application/:application_id/approve')
  .get((req, res) => {
    Application
      .where('id', req.params.application_id)
      .fetch({withRelated:['users']})
      .then( results => {
        if (results) {
          res.json(results.toJSON())
        } else {
          res.json({error: 'No results found.'})
        }
      })
  })

  .post((req, res) => {
    // Update approved status
    Application
      .forge({
        id:req.params.application_id
      })
      .fetch({withRelated:['users','sessions.users']})
      .then( results => {
        results.save({
          approved:true
        }).then( results => {
          var a = results.toJSON();

          // Add the user to the session they applied to.
          // TODO: Only add them if there's space available.
          knex('user_sessions').insert({
            session_id:a.sessions[0].id,
            user_id:a.users[0].id
          }).then(() => {
            console.log('Did the thing!');
            res.json({success:"Approved Application"})
          });
        })
      })
  })

router.route('/application/:application_id/deny')
  .delete((req, res) => {
    Application
      .where('id', req.params.application_id)
      .destroy()
      .then(() => {
        res.json({success:"Denied Application"});
      })
  })

router.route('/user/:user_id/applications')
  .get((req, res) => {
    User
      .where('id', req.params.user_id)
      .fetch({withRelated:['applications', 'applications.users']})
      .then( results => {
        if (results){
          res.json(results.toJSON())
        } else {
          res.json({error:'No results found.'})
        }
      })
  })

module.exports = router;
