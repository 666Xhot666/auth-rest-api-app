import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { get } from 'config'
import { WhiteTokensModel } from '../database'

export const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
      return res
        .status(401)
        .json({ error: 'not authorithated', message: 'token unavalaible' })
    }

    const decoded = jwt.verify(token, get('jwt_secret'))

    // if (!Object.keys(decoded).includes('userId')) {
    //   throw new Error('Token  Invalid')
    // }

    const { userId, typeId } = <{ userId: string; typeId: string }>decoded

    const whiteToken = <{ token: string }>(
      await WhiteTokensModel.findOne({ user_id: userId })
    )

    if (!whiteToken) {
      return res
        .status(401)
        .json({ error: 'not authorizated', message: 'token no active' })
    }

    if (token !== whiteToken.token) {
      return res
        .status(401)
        .json({ error: 'not authorizated', message: 'token no active' })
    }
    req.body.user = { userId, typeId }
    next()
  } catch (error) {
    return res
      .status(401)
      .json({ error: 'Not authorithated', message: 'token invalid' })
  }
}
