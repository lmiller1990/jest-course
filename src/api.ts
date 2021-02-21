import * as express from 'express'

export const createApp = () => {
  const app = express()
  app.get('/data', (req, res) => {
    res.json({ foo: 'bar' })
  })

  app.post('/login', (req, res) => {
    res.json({ foo: 'bar' })
  })

  return app
}
