import { createResolver } from '@nuxt/kit'
import { build } from 'tsup'

const { resolve } = createResolver(import.meta.url)
export default defineNuxtConfig({
  hooks: {
    'build:done': async () => {
      const outDir = './.knex/database/migrations'

      await build({
        entry: ['./server/database/migrations/*.ts'],
        format: ['esm'],
        target: 'esnext',
        outDir: resolve(outDir),
        clean: true,
      })
    },
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    admin: {
      email: 'admin@example.com',
      password: undefined,
    },
    currency: {
      apiKey: '',
      base_currency: 'EUR',
      currencies: [],
      cron: '0 2 * * *',
      keep: 7,
    },
  },
})
