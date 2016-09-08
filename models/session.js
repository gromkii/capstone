var bookshelf = require('../db/bookshelf');

require('./user')
require('./userSession')

var Session = bookshelf.Model.extend({
  tableName:'sessions',
  users(){
    return this.belongsToMany('User', 'user_sessions');
  }
});

module.exports = bookshelf.model('Session', Session);
