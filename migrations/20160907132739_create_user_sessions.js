
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_sessions', table => {
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade'),
    table.integer('session_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_sessions');
};
