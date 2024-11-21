import { headers } from 'next/headers'
import { randomBytes } from 'crypto'

// Generate a random token
export function generateCSRFToken() {
  return randomBytes(32).toString('hex')
}

// Validate the token
export function validateCSRFToken(token: string | null, storedToken: string | null) {
  if (!token || !storedToken) return false
  return token === storedToken
}
