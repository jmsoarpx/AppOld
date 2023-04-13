const request = require('supertest')
const app = require('../config/app')

describe('Content-type Middleware', () => {
  test('Should return json content-type as default', async () => {
    app.get('/teste-content-type', (req, res) => {
      res.send({})
    })
    await request(app)
      .get('/teste-content-type')
      .expect('content-type', /json/)
  })

  test('Should return xml content-type is forced', async () => {
    app.get('/teste-content-type-xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get('/teste-content-type-xml')
      .expect('content-type', /xml/)
  })
})
