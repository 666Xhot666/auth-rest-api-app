import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)

  const login = useCallback(async (jwtToken, jwtUserId) => {
    await setToken(jwtToken)
    await setUserId(jwtUserId)
    localStorage.setItem(
      storageName,
      JSON.stringify({ token: jwtToken, userId: jwtUserId })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const item = localStorage.getItem(storageName)
    if (item) {
      const data = JSON.parse(item)
      if (data && data.token) {
        login(data.token, data.userId)
      }
      setReady(true)
    }
  }, [login])

  return { login, logout, userId, token, ready }
}
