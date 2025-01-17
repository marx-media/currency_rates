import { Buffer } from 'node:buffer'
import crypto from 'node:crypto'

export const randomPassword = (length = 12): string => {
  return crypto.randomBytes(length).toString('hex')
}

export function hash(value: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const derivedKey = crypto.scryptSync(value, salt, 64)
  return `${salt}:${derivedKey.toString('hex')}`
}

export function verifyHash(value: string, hash: string): boolean {
  const [salt, key] = hash.split(':')
  const derivedKey = crypto.scryptSync(value, salt, 64)
  return key === derivedKey.toString('hex')
}

export function encrypt(value: string, secret: string): string {
  const key = crypto.scryptSync(secret, 'salt', 24)
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-192-cbc', Buffer.from(key), iv)
  const encrypted = cipher.update(value, 'utf8', 'hex') + cipher.final('hex')
  return `${iv.toString('hex')}:${encrypted}`
}

export function decrypt(value: string, secret: string): string {
  const key = crypto.scryptSync(secret, 'salt', 24)
  const [iv, encrypted] = value.split(':')
  const decipher = crypto.createDecipheriv('aes-192-cbc', key, Buffer.from(iv, 'hex'))
  const decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8')
  return decrypted
}
