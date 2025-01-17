import { schedule } from 'node-cron'
import { useApiKeyService } from '../services/api.service'
import { useCurrencyService } from '../services/currency.service'
import { useDatabaseService } from '../services/db.service'
import { useUserService } from '../services/user.service'
import { randomPassword } from '../utils/hash'

export default defineNitroPlugin(async () => {
  let { admin: { email, password }, currency: { cron } } = useRuntimeConfig()
  const { getDatabase } = useDatabaseService()
  const userService = useUserService()
  const apiKeyService = useApiKeyService()
  const currencyService = useCurrencyService()

  // await getDatabase().migrate.rollback()
  await getDatabase().migrate.latest()

  const users = await userService.listUsers()
  if (users.length === 0) {
    password = password || randomPassword(8)
    const user = await userService.createUser(email, password)
    const apiKey = await apiKeyService.createApiKey({
      user_id: user.id,
      name: 'Admin Key',
      revoked: false,
    })
    console.info(`Admin user created:`)
    console.info(`-- email: ${email}`)
    console.info(`-- password: ${password}`)
    console.info(`-- api_key: ${apiKey.key}`)
    await currencyService.getLatest()
  }

  schedule(cron, currencyService.storeLatest)
})
