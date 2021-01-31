import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { get } from 'config'
import path from 'path'

import { authRouter, userRouter } from './routes'

const app = express()
const PORT = get('port') as string

app.disable('x-powered-by')
app.use(cors(), express.json())

app.use('/auth', authRouter)
app.use('/user', userRouter)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../', 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  })
}

mongoose
  .connect(get('mongo_uri'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[CORE] Server has been started at port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(`[CORE][DATABASE] ${err}`)
  })
