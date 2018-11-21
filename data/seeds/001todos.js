exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("todos")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("todos").insert([
        {
          name: "Create back end",
          description:
            "A refresher to make sure I haven't forgotten the last two weeks of Lambda School"
        },
        {
          name: "Create Front end",
          description:
            "This is the real center piece of this excersize. I want to learn hooks."
        }
      ]);
    });
};
