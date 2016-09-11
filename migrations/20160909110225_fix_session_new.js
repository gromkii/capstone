
exports.up = function(knex, Promise) {
  return knex.schema.table('sessions', table => {
    table.integer('num_players'),
    table.integer('host_id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('sessions', table => {
    table.dropColumn('num_players'),
    table.dropColumn('host_id')
  });
};
