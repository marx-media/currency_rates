import type { Knex } from 'knex'

export const knexConfig: Record<string, Knex.Config> = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    migrations: {
      directory: `./.knex/database/migrations`,
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'better-sqlite3',
    connection: {
      filename: './data.sqlite3',
    },
    migrations: {
      directory: `./.knex/database/migrations`,
    },
    useNullAsDefault: true,
  },
}

export default knexConfig
