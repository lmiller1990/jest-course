import { Server } from 'http'
import * as axios from 'axios'
import { createApp } from './api'

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