var bookshelf = require('../db/bookshelf');


require('./session');
require('./user');

var UserSession = bookshelf.Model.extend({
  tableName:'user_sessions',
  users(){
    return this.belongsToMany('User');
  },
  sessions(){
    return this.belongsToMany('Session');
  }
});

module.exports = bookshelf.model('UserSession', UserSession);
