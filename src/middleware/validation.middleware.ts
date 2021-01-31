import { NextFunction, Request, Response } from 'express'

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const email_reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const phone_reg = /^[0-9\+]{1,}[0-9\-]{3,15}$/

  const { id, password } = req.body

  if (id && password) {
    const isEmail = email_reg.test(String(id).toLowerCase())
    const isPhone = phone_reg.test(String(id).toLowerCase())
    if (isEmail || isPhone) {
      if (String(password).length >= 6) {
        req.body.id_type = isEmail ? 'email' : 'phone'
        next()
        return
      }
      return res.status(400).json({
        error: 'Incorrect password',
        message: 'Password must have more then 6 symbols',
      })
    }
    return res
      .status(400)
      .json({ error: 'incorrect id', message: 'Id must be phone or email' })
  }
  return res
    .status(400)
    .json({ error: 'Invalid credentials', message: 'Check your credentials' })
}
