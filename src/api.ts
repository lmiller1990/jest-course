import * as express from 'express'
import * as jwt from 'jsonwebtoken'

export const createApp = () => {
  const app = express()
  app.get('/data', (req, res) => {
    res.json({ foo: 'bar' })
  })

  app.post('/login', (req, res) => {
    const auth = req.headers.authorization
    if (!auth) {
      res.sendStatus(401)
    }
    // Authorization: Bearer ____
    const [_, token] = auth.split(' ')
    console.log(token)

    res.json({ foo: 'bar' })
  })

  return app
}
