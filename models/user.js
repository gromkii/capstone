var bookshelf = require('../db/bookshelf');

require('./userRole')
require('./userGroup')
require('./userSession')

var User = bookshelf.Model.extend({
  tableName:'users',
  userGroup(){
    return this.hasMany('UserGroup');
  },
  session(){
    return this.hasMany('Session').through('UserSession');
  },
  userSession(){
    return this.hasMany('UserSession');
  }
});

// Define User methods here.

module.exports = bookshelf.model('User', User)
