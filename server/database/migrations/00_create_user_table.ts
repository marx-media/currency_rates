import type { Knex } from 'knex'

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').unsigned().primary()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.timestamps(true, true)
  })
}

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable('users')
}
