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
    app = createApp().listen(8080, done)
  })

  afterEach((done) => {
    app.close(done)
  })

  it('get data', async () => {
    interface Data {
      foo: string
    }
    const res = await axios.default.get<Data>('http://localhost:8080/data')
    expect(res.data).toEqual<Data>({ foo: 'bar' })
  })
})