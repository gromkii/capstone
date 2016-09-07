var bookshelf = require('../db/bookshelf');

require('./user');
require('./userRole');

var UserGroup = bookshelf.Model.extend({
  tableName:'user_groups',
  user(){
    return this.belongsTo('User');
  },
  userRole(){
    return this.belongsTo('UserRole');
  }
});

module.exports = bookshelf.model('UserGroup', UserGroup);
