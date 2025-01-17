// server/database/migrations/00_create_user_table.ts
var up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").unsigned().primary();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });
};
var down = async (knex) => {
  await knex.schema.dropTable("users");
};
export {
  down,
  up
};
