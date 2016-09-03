
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increment().primary().index(),
    table.string('username'),
    table.string('email'),
    table.text('avatar_url');
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
