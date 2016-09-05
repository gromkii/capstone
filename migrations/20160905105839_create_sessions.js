
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', table => {
    table.increments().primary().index(),
    table.string('session_name'),
    table.string('game_name'),
    table.text('session_desc'),
    table.text('header_url'),
    table.date('start_date'),
    table.string('runtime');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sessions');
};
