var bookshelf = require('../db/bookshelf');

require('./user')
require('./userSession')

var Session = bookshelf.Model.extend({
  tableName:'sessions',
  user(){
    return this.hasMany('User').through('UserSession');
  },
  userSession(){
    return this.hasMany('UserSession');
  }
});

module.exports = bookshelf.model('Session', Session);
