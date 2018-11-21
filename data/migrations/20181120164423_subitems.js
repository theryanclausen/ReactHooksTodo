
exports.up = function(knex, Promise) {
    return knex.schema.createTable('subitems', tbl =>{
        tbl.increments();
        tbl.string('name', 128).unique().notNullable();
        tbl.boolean('complete').defaultTo(false)
        tbl.integer('todo_id').references('id').inTable('todos');
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('subitems')
  
};
