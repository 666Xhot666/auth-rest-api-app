import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useHttp, useMessage } from '../hooks'
import { AuthContext } from '../context'

export const UserPage = () => {
  const [info, setInfo] = useState({ userId: '', typeId: '' })
  const [latency, setLatency] = useState('')
  const { loading, request, error, clearError } = useHttp()
  const message = useMessage()
  const { token, logout } = useContext(AuthContext)

  useEffect(() => {
    message(error)
    if (error === 'token invalid' || error === 'token no active') {
      logout()
    }
    clearError()
  }, [error, message, clearError, logout])

  const fetchInfo = useCallback(async () => {
    try {
      const fetched = await request('/user/info', 'GET', null, {
        authorization: `Bearer ${token}`,
      })
      setInfo({ ...fetched })
    } catch (error) {}
  }, [token, request])

  const fetchLatency = useCallback(async () => {
    try {
      const fetched = await request('/user/latency', 'GET', null, {
        authorization: `Bearer ${token}`,
      })
      setLatency(fetched.latency)
    } catch (error) {}
  }, [token, request])

  useEffect(() => {
    fetchLatency()
    fetchInfo()
  }, [fetchInfo, fetchLatency])

  return (
    <div className='container'>
      <div className='row card-user-info'>
        <div className='col s10 offset-s1 '>
          <div className='card blue-grey darken-1'>
            <div className='card-content white-text'>
              <span className='card-title center'>User Page</span>

              <p>Latency: {latency}</p>
              <p>User Info: {JSON.stringify(info)}</p>
            </div>
            <div className='card-action'>
              <button
                className='btn grey lighten-2 black-text'
                onClick={fetchLatency}
                disabled={loading}
              >
                Latency
              </button>
              <button
                className='btn grey lighten-2 black-text right'
                onClick={fetchInfo}
                disabled={loading}
              >
                User Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
