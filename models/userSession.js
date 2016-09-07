const bookshelf = require('../db/bookshelf');

require('./session');
require('./user');

let UserSession = bookshelf.Model.extend({
  tableName:'user_sessions',
  user(){
    return this.hasMany('User');
  },
  session(){
    return this.hasMany('Session');
  }
});

module.exports = bookshelf.model('UserSession', UserSession);º
