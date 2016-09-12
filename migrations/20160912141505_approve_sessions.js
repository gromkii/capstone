
exports.up = function(knex, Promise) {
  return knex.schema.createTable('approve_applications', table => {
    table.integer('app_id')
      .references('id')
      .inTable('session_applications')
      .onDelete('cascade'),
    table.integer('host_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade'),
    table.bool('approved').defaultsTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('approve_applications');
};
