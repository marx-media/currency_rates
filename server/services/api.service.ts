import type { IDocument } from '~~/shared/types/document'
import { useDatabaseService } from './db.service'

export interface IApiKey {
  user_id: number
  key: string
  name: string
  description?: string
  revoked: boolean
}

export const useApiKeyService = () => {
  const { getDatabase } = useDatabaseService()
  const db = getDatabase()

  const createApiKey = async (payload: Omit<IApiKey, 'key'>) => {
    const [data] = await db.from<IApiKey>('api_keys').insert({
      ...payload,
      key: randomPassword(32),
    }).returning<(IApiKey & IDocument)[]>('*')
    return data
  }

  const getUserIdFromApiKey = async (key: string): Promise<number | undefined> => {
    const result = await db<IApiKey>('api_keys')
      .select('user_id')
      .where('key', key)
      .andWhere('revoked', false)
      .first()

    return result?.user_id
  }

  return {
    createApiKey,
    getUserIdFromApiKey,
  }
}
