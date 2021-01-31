import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { get } from 'config'

import { UserModel, WhiteTokensModel } from '../database'
import { checkJwt, validator } from '../middleware'

export const router = Router()

// /auth/signup
router.post('/signup', validator, async (req, res) => {
  try {
    const { id, password, id_type } = req.body
    const candidate = await UserModel.exists({ id })

    if (candidate) {
      return res.status(400).json({
        error: 'User not created',
        message: `User with this id already yet`,
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const token = jwt.sign({ userId: id, typeId: id_type }, get('jwt_secret'), {
      expiresIn: get('jwt_expiration'),
    })

    const user = new UserModel({ id, password: hashedPassword, id_type })
    const whiteToken = new WhiteTokensModel({ user_id: id, token })

    await whiteToken.save()
    await user.save()

    return res.status(201).json({ token, message: 'Signup sucessfull' })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong, try again' })
  }
})

// /auth/signin
router.post('/signin', validator, async (req, res) => {
  try {
    const { id, password } = req.body
    const user = await UserModel.findOne({ id })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        message: 'Incorrect password try again',
      })
    }
    const token = jwt.sign(
      { userId: user.id, typeId: user.id_type },
      get('jwt_secret'),
      {
        expiresIn: get('jwt_expiration'),
      }
    )

    const whiteTokenFromDb = await WhiteTokensModel.findOneAndUpdate(
      { user_id: user.id },
      { token }
    )

    if (!whiteTokenFromDb) {
      const whiteToken = new WhiteTokensModel({ user_id: user.id, token })
      await whiteToken.save()
    }

    return res.json({ token, userId: user._id })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong, try again' })
  }
})

// /auth/logout
router.get('/logout', checkJwt, async (req, res) => {
  const all = req.query.all
  const { userId } = req.body.user
  if (all === 'true') {
    await WhiteTokensModel.deleteMany()
    return res.json({ message: 'Logout sucessfull, removed all tokens' })
  }
  await WhiteTokensModel.findOneAndDelete({ user_id: userId })
  res.json({ message: 'logout sucessfull' })
})
