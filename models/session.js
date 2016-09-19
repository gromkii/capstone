var bookshelf = require('../db/bookshelf');

require('./user')
require('./userSession')
require('./application')

var Session = bookshelf.Model.extend({
  tableName:'sessions',
  users(){
    return this.belongsToMany('User', 'user_sessions');
  },
  host(){
    return this.belongsTo('User', 'host_id');
  },
  applications(){
    return this.belongsToMany('Application', 'approve_applications', 'session_id', 'app_id');
  }
});

module.exports = bookshelf.model('Session', Session);
