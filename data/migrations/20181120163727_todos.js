
exports.up = function(knex, Promise) {
    return knex.schema.createTable('todos', tbl =>{
        tbl.increments();
        tbl.string('name',128).unique().notNullable();
        tbl.string('description', 555)
        tbl.boolean('complete').defaultTo(false)
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('todos')
};
