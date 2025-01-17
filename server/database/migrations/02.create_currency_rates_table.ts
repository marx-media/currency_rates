import type { Knex } from 'knex'

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('currency_rates', (table) => {
    table.increments('id').primary()
    table.string('base_currency').notNullable()
    table.string('quote_currency').notNullable()
    table.float('rate').notNullable()
    table.date('created_at').notNullable()
  })
}

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable('currency_rates')
}
