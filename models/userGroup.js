var bookshelf = require('../db/bookshelf');

require('./user');
require('./userRole');

var UserGroup = bookshelf.Model.extend({
  tableName:'user_groups',
  user(){
    return this.belongsTo('User').through('UserGroup');
  },
  userRole(){
    return this.belongsToMany('UserRole');
  }
});

module.exports = bookshelf.model('UserGroup', UserGroup);
