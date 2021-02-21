import * as express from 'express'
import { Server } from 'http'
import * as axios from 'axios'

const createApp = () => {
  const app = express()
  app.get('/data', (req, res) => {
    res.json({ foo: 'bar' })
  })
  return app
}

describe('app', () => {
  let app: Server
  beforeEach((done) => {
    console.log('Before')
    app = createApp().listen(8080, done)
  })

  afterEach((done) => {
    console.log('After')
    app.close(done)
  })

  it('get data', async () => {
    const res = await axios.default.get('http://localhost:8080/data')
    console.log(res.data)
  })
})