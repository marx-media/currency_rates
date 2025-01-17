import type { IDocument } from '~~/shared/types/document'
import { useDatabaseService } from './db.service'

export interface IUser {
  email: string
  password: string
}

export const useUserService = () => {
  const { getDatabase } = useDatabaseService()

  const db = getDatabase()
  const table_name = 'users'

  const listUsers = async () => {
    return await db.from<IUser>(table_name).select('*')
  }

  const createUser = async (email: string, password: string) => {
    const [user] = await db.from<IUser>(table_name).insert({
      email,
      password: hash(password),
    }).returning<(IUser & IDocument)[]>('*')
    return user
  }

  return {
    listUsers,
    createUser,
  }
}
