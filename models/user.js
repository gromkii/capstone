var bookshelf = require('../db/bookshelf');

require('./userRole')
require('./userGroup')
require('./userSession')

var User = bookshelf.Model.extend({
  tableName:'users',
  hasTimestamps:true,
  userGroup(){
    return this.hasMany('UserGroup');
  },
  sessions(){
    return this.belongsToMany('Session', 'user_sessions');
  }
});

// Define User methods here.

module.exports = bookshelf.model('User', User)
