import { useApiKeyService } from '../services'

export default defineEventHandler(async (event) => {
  const authorization = getHeader(event, 'Authorization')
  const api_key = authorization?.split('Bearer ')[1]
  if (api_key) {
    const user_id = await useApiKeyService().getUserIdFromApiKey(api_key)
    event.context.user_id = user_id
  }
})
