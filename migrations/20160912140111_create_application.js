
exports.up = function(knex, Promise) {
  return knex.schema.createTable('session_applications', table => {
    table.increments(),
    table.bool('has_played'),
    table.integer('years_played'),
    table.bool('used_platform'),
    table.integer('exp_level'),
    table.text('application')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('session_applications')
};
