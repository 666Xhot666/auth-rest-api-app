import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    id: '',
    password: '',
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/auth/signup', 'POST', { ...form })
      await auth.login(data.token, data.userId)
      message(data.message)
      history.push('/')
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/auth/signin', 'POST', { ...form })
      await auth.login(data.token, data.userId)
      history.push('/')
    } catch (e) {}
  }

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1> Auth App</h1>
        <div className='card blue darken-4'>
          <div className='card-content white-text'>
            <span className='card-title'>Sign in or Sign up </span>
            <div>
              <div className='row'>
                <div className='input-field col s11'>
                  <input
                    id='id'
                    type='text'
                    name='id'
                    className='validate  white-text'
                    value={form.id}
                    onChange={changeHandler}
                  />
                  <label htmlFor='id'>Email or Phone</label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s8'>
                  <input
                    id='password'
                    type='password'
                    name='password'
                    className='validate  white-text'
                    value={form.password}
                    onChange={changeHandler}
                  />
                  <label htmlFor='password'>Password</label>
                </div>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button
              className='btn orange accent-2 darken-4 black-text'
              style={{ marginRight: 10 }}
              onClick={loginHandler}
              disabled={loading}
            >
              Sign in
            </button>
            <button
              className='btn grey lighten-2 black-text'
              onClick={registerHandler}
              disabled={loading}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
