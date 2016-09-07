var bookshelf = require('../db/bookshelf');

require('./userRole')
require('./userGroup')

var User = bookshelf.Model.extend({
  tableName:'users',
  userGroup(){
    return this.hasMany('UserGroup')
  }
});

// Define User methods here.

module.exports = bookshelf.model('User', User)
