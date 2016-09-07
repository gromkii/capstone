var bookshelf = require('../db/bookshelf');

require('./userRole')
require('./userGroup')

var User = bookshelf.Model.extend({
  tableName:'users',
  // Define relations here.
  userGroup(){
    return this.belongsToMany('UserGroup');
  }
});

// Define User methods here.

module.exports = bookshelf.model('User', User)
