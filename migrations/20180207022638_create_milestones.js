
exports.up = function(knex, Promise) {
  // migrate forward
  return knex.schema.createTable('milestones', function (table) {
    table.increments('id');
    table.string('description');
    table.date('date_achieved');
  });
};

exports.down = function(knex, Promise) {
  // migrate backward
  return knex.schema.dropTable('milestones');
};
