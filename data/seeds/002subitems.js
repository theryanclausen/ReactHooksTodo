exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("subitems")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("subitems").insert([
        {
          name: "Build out express server",
          todo_id: 1
        },
        {
          name: "CRUD endpoints",
          todo_id: 1
        },
        {
          name: "Create React App",
          todo_id: 2
        },
        {
          name: "Clean up the boiler plate",
          todo_id: 2
        },
        {
          name: "Watch React hooks tutorial",
          todo_id: 2
        },
        {
          name: "Get to work",
          todo_id: 2
        }
      ]);
    });
};
