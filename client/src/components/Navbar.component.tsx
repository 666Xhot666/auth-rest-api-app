import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context'
import { useHttp } from '../hooks'

export const NavbarComponent: React.FC = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const isAuthenticated = !!auth.token

  const logoutOneHandler = async () => {
    await request('/auth/logout?all=false', 'GET', null, {
      authorization: `Bearer ${auth.token}`,
    })
    auth.logout()
    history.push('/')
  }
  const logoutAllHandler = async () => {
    await request('/auth/logout?all=true', 'GET', null, {
      authorization: `Bearer ${auth.token}`,
    })
    await auth.logout()
    history.push('/')
  }
  return (
    <nav>
      <div className='nav-wrapper blue accent-2'>
        <span className='brand-logo'>Auth App</span>
        {isAuthenticated && (
          <ul className='right hide-on-med-and-down'>
            <li>
              <a href='#' onClick={logoutOneHandler}>
                Log Out
              </a>
            </li>
            <li>
              <a href='#' onClick={logoutAllHandler}>
                Log Out All Users
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}
