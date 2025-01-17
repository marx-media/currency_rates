// server/database/migrations/01_create_api_keys_table.ts
var up = async (knex) => {
  await knex.schema.createTable("api_keys", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.string("key").notNullable().unique();
    table.string("name").notNullable();
    table.string("description");
    table.boolean("revoked").defaultTo(false);
    table.timestamps(true, true);
  });
};
var down = async (knex) => {
  await knex.schema.dropTable("api_keys");
};
export {
  down,
  up
};
