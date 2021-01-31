import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage, UserPage } from './pages'

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/' component={UserPage} />
        <Redirect to='/' />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route exact path='/' component={AuthPage} />
        <Redirect to='/' />
      </Switch>
    )
  }
}
