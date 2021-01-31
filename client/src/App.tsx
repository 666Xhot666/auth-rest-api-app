import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContext } from './context'
import { NavbarComponent } from './components'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'

import 'materialize-css'

export const App: React.FC = () => {
  const { token, login, logout, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <Router>
        <NavbarComponent />

        <div className='container'>{routes}</div>
      </Router>
    </AuthContext.Provider>
  )
}
