
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_groups', table => {
    table.increments(),
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade'),
    table.integer('role_id')
      .references('id')
      .inTable('user_roles')
      .onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_groups');
};
