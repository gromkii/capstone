var express = require('express'),
  router = express.Router(),
  User = require('../models/user');

router.route('/users')
  .get((req, res) => {
    User.fetchAll().then(users => {
      res.send(users.toJSON());
    });
  });

module.exports = router;
