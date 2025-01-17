// server/database/migrations/02.create_currency_rates_table.ts
var up = async (knex) => {
  await knex.schema.createTable("currency_rates", (table) => {
    table.increments("id").primary();
    table.string("base_currency").notNullable();
    table.string("quote_currency").notNullable();
    table.float("rate").notNullable();
    table.date("created_at").notNullable();
  });
};
var down = async (knex) => {
  await knex.schema.dropTable("currency_rates");
};
export {
  down,
  up
};
