var bookshelf = require('../db/bookshelf');

require('./user')
require('./userGroup')

var UserRole = bookshelf.Model.extend({
  tableName:'user_roles',
  user(){
    return this.hasMany('User');
  },
  userRole(){
    return this.hasMany('UserRole');
  }
});

module.exports = bookshelf.model('UserRole', UserRole);
