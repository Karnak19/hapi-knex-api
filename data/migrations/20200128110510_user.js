exports.up = async knex => {
  try {
    return await Promise.all([
      knex.schema.createTable("teams", table => {
        table
          .uuid("id")
          .primary()
          .unique()
          .notNullable();
        table.string("name");
        table.string("logo");
      }),
      knex.schema.createTable("users", table => {
        table
          .uuid("id")
          .primary()
          .unique()
          .notNullable();
        table.string("firstName");
        table.string("lastName");
        table.integer("age");
        table
          .uuid("teamId")
          .references("teams.id")
          .onDelete("CASCADE");
      })
    ]);
  } catch (err) {
    console.log(err);
  }
};

exports.down = async knex => {
  return await Promise.all([
    knex.schema.dropTableIfExists("teams"),
    knex.schema.dropTableIfExists("users")
  ]);
};
