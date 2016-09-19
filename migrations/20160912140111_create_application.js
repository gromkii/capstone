
exports.up = function(knex, Promise) {
  return knex.schema.createTable('session_applications', table => {
    table.increments(),
    table.bool('has_played').defaultsTo('false'),
    table.integer('years_played').defaultsTo(0),
    table.bool('used_platform').defaultsTo('false'),
    table.integer('exp_level').defaultsTo(1),
    table.text('application')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('session_applications')
};
