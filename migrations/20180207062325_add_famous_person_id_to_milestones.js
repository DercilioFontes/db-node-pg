
exports.up = function(knex, Promise) {
  // migrate forward - Adding new column famous_person_id as foreign key
  return knex.schema.table('milestones', function (table) {
    table.integer('famous_person_id').unsigned();
    table.foreign('famous_person_id').references('famous_people.id');
  });
};

exports.down = function(knex, Promise) {
  // migrate backward - Removing column famous_person_id as foreign key
  return knex.schema.table('milestones', function(table) {
    table.dropForeign('famous_person_id');
  });
};
