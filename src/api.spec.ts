import * as express from 'express'
import * as axios from 'axios'

const createApp = () => {
  const app = express()
  app.get('/data', (req, res) => {
    res.json({ foo: 'bar' })
  })
  return app
}

test('', () => {
  const app = createApp()
  app.listen(8080)
  axios.default.get('http://localhost:8080/data')
    .then(res => console.log(res.data))
})