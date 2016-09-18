var bookshelf = require('../db/bookshelf');

require('./user')
require('./userSession')

var Session = bookshelf.Model.extend({
  tableName:'sessions',
  users(){
    return this.belongsToMany('User', 'user_sessions');
  },
  host(){
    return this.belongsTo('User', 'host_id');
  }
});

module.exports = bookshelf.model('Session', Session);
