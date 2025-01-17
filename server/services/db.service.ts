import type { Knex } from 'knex'
import knex from 'knex'
import { knexConfig } from '~~/server/knex.config'

const __instances = new Map()

export const useDatabaseService = () => {
  const env = import.meta.dev ? 'development' : 'production'

  const getDatabase = (): Knex => {
    if (!__instances.has(env)) {
      const db = knex(knexConfig[env])
      __instances.set(env, db)
    }
    return __instances.get(env)
  }

  return {
    getDatabase,
  }
}
