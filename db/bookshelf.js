var environment = process.env.NODE_ENV || 'development',
    config      = require('../knexfile')[environment],
    knex        = require('knex')(config),
    bookshelf   = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;
