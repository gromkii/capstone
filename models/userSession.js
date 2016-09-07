const bookshelf = require('../db/bookshelf');

require('./session');
require('./user');

let UserSession = bookshelf.Model.extend({
  tableName:'user_sessions',
  user(){

  },
  session(){

  }
});

module.exports = bookshelf.model('UserSession', UserSession);
