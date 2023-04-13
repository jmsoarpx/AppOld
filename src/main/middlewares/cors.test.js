const request = require('supertest')
const app = require('../config/app')

describe('CORS Middleware', () => {
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
