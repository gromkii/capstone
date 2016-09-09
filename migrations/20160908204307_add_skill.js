
exports.up = function(knex, Promise) {
  return knex.schema.table('sessions', table => {
    table.integer('skill_level');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('sessions', table => {
    table.dropColumn('skill_level');
  })
};
