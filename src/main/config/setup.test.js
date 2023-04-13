const request = require('supertest')
const app = require('./app')

describe('App setup', () => {
  test('Should disable x-powered-by header', async () => {
    app.get('/teste-x-powered-by', (req, res) => {
      res.send('')
    })
    const res = await request(app).get('/teste-x-powered-by')
    expect(res.headers['X-Powered-By']).toBeUndefined()
  })

  test('Should enable CORS', async () => {
    app.get('/teste-cors', (req, res) => {
      res.send('')
    })
    const res = await request(app).get('/teste-x-powered-by')
    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
