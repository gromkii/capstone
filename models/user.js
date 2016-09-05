var bookshelf = require('../db/bookshelf');

var User = bookshelf.Model.extend({
  tableName:'users'
  // Define relations here.
});

// Define User methods here.

module.exports = bookshelf.model('User', User)
