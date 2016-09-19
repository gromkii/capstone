var bookshelf = require('../db/bookshelf');

require('./userRole')
require('./userGroup')
require('./userSession')
require('./application')

var User = bookshelf.Model.extend({
  tableName:'users',
  hasTimestamps:true,
  userGroup(){
    return this.hasMany('UserGroup');
  },
  sessions(){
    return this.belongsToMany('Session', 'user_sessions');
  },
  applications(){
    return this.belongsToMany('Application', 'approve_applications')
  },
  hosting(){
    return this.hasMany('Session', 'host_id');
  }
});

// Define User methods here.

User.getSessions = function(user_id) {
  return new Promise((resolve, reject) => {
    User
      .where('id', user_id)
      .fetch({withRelated: ['sessions']})
      .then( results => {
        resolve(results);
      })
  })
}


module.exports = bookshelf.model('User', User)
