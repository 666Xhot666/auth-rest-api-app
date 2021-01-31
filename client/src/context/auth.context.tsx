import { createContext } from 'react'

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: (userId: string, jwtUserId: string) => {},
  logout: () => {},
  isAuthenticated: false,
})
