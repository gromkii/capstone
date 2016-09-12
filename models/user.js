var bookshelf = require('../db/bookshelf');

require('./userRole')
require('./userGroup')
require('./userSession')

var User = bookshelf.Model.extend({
  tableName:'users',
  hasTimestamps:true,
  hidden:['passord'],
  userGroup(){
    return this.hasMany('UserGroup');
  },
  sessions(){
    return this.belongsToMany('Session', 'user_sessions');
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
