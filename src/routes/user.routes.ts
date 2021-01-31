import express, { Request, Response } from 'express'
import { get } from 'config'
import ping from 'ping'
import { checkJwt } from '../middleware'

export const router = express.Router()

// /user/info
router.get('/info', [checkJwt], (req: Request, res: Response) => {
  res.json(req.body.user)
})

// /user/latency
router.get('/latency', [checkJwt], async (req: Request, res: Response) => {
  ping.promise
    .probe(get('ping'))
    .then((response) => {
      if (response.time === 'unknown') {
        res.json({ latency: 'Server Died' })
      }
      res.json({ latency: `${response.time} ms` })
    })
    .catch((rej) => {
      res.status(500).json({
        error: 'Latency not avalaible',
        message: 'Try again, try again please',
      })
    })
})
