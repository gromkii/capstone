
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_roles', table => {
    table.increments(),
    table.string('role');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('user_roles');
};
