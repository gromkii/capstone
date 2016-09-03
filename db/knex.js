var environment = process.env.NODE_ENV || 'development',
    config      = require('../knexfile')[environment],
    knex        = require('knex')(config);
    
module.exports = knex;
