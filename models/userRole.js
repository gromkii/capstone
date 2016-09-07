var bookshelf = require('../db/bookshelf');

require('./user')
require('./userGroup')

var UserRole = bookshelf.Model.extend({
  tableName:'user_roles'
});

module.exports = bookshelf.model('UserRole', UserRole);
