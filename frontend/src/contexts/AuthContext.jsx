/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  getProfile,
  login as loginRequest,
  loginWithGoogle as loginWithGoogleRequest,
  register as registerRequest,
  updateProfile as updateProfileRequest,
} from '../services/authService'

const AuthContext = createContext(null)
const AUTH_STORAGE_KEY = 'tupaSoftAuth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY)
      if (!saved) {
        setStatus('ready')
        return
      }

      const parsed = JSON.parse(saved)
      if (parsed?.token && parsed?.user) {
        setToken(parsed.token)
        setUser(parsed.user)
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    } finally {
      setStatus('ready')
    }
  }, [])

  useEffect(() => {
    if (token && user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token, user }))
      return
    }

    localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [token, user])

  useEffect(() => {
    let isMounted = true

    async function refreshProfile() {
      if (!token) {
        return
      }

      try {
        const response = await getProfile(token)
        if (isMounted) {
          setUser(response.user)
        }
      } catch {
        if (isMounted) {
          setToken(null)
          setUser(null)
        }
      }
    }

    refreshProfile()

    return () => {
      isMounted = false
    }
  }, [token])

  const login = useCallback(async ({ email, password }) => {
    const response = await loginRequest({ email, password })
    setToken(response.token)
    setUser(response.user)
    return response
  }, [])

  const register = useCallback(async ({ name, email, password, phone }) => {
    const response = await registerRequest({ name, email, password, phone })
    setToken(response.token)
    setUser(response.user)
    return response
  }, [])

  const loginWithGoogle = useCallback(async () => {
    const response = await loginWithGoogleRequest()
    setToken(response.token)
    setUser(response.user)
    return response
  }, [])

  const updateProfile = useCallback(
    async ({ name, phone }) => {
      if (!token) {
        throw new Error('Nao autenticado')
      }

      const response = await updateProfileRequest(token, { name, phone })
      setUser(response.user)
      return response
    },
    [token],
  )

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [])

  const value = useMemo(
    () => ({
      user,
      token,
      status,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      loginWithGoogle,
      updateProfile,
      logout,
    }),
    [login, loginWithGoogle, logout, register, status, token, updateProfile, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }

  return context
}
