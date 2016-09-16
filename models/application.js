var bookshelf = require('../db/bookshelf')

require('./user')

var Application = bookshelf.Model.extend({
  tableName:'session_applications',
  users(){
    return this.belongsToMany('User', 'approve_applications');
  }
});

module.exports = bookshelf.model('Application', Application);
