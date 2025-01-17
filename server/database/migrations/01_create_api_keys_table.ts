import type { Knex } from 'knex'

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('api_keys', (table) => {
    table.increments('id').primary()
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
    table.string('key').notNullable().unique()
    table.string('name').notNullable()
    table.string('description')
    table.boolean('revoked').defaultTo(false)
    table.timestamps(true, true)
  })
}

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable('api_keys')
}
