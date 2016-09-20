var bookshelf = require('../db/bookshelf')

require('./user')
require('./session')

var Application = bookshelf.Model.extend({
  tableName:'session_applications',
  users(){
    return this.belongsToMany('User', 'approve_applications', 'app_id', 'applicant_id');
  },
  sessions(){
    return this.belongsToMany('Session', 'approve_applications', 'app_id', 'session_id');
  }
});

module.exports = bookshelf.model('Application', Application);
