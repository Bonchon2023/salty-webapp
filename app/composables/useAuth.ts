import { useState, useCookie } from '#app'

export const useAuth = () => {
  // Store the JWT token securely in a cookie
  const tokenCookie = useCookie<string | null>('salty_auth_token', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })

  // Expose reactive state
  const token = useState<string | null>('auth_token', () => tokenCookie.value)
  const isAuthenticated = useState<boolean>('is_authenticated', () => !!tokenCookie.value)

  // API Methods
  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await $fetch<{ token: string }>('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: credentials
      })
      
      if (response && response.token) {
        tokenCookie.value = response.token
        token.value = response.token
        isAuthenticated.value = true
        return true
      }
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = () => {
    tokenCookie.value = null
    token.value = null
    isAuthenticated.value = false
  }

  return {
    token,
    isAuthenticated,
    login,
    logout
  }
}
