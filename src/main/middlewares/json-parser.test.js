const request = require('supertest')
const app = require('../config/app')

describe('JSON Parser Middleware', () => {
  test('Should parser body as JSON', async () => {
    app.post('/teste-json-parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/teste-json-parser')
      .send({ name: 'Julio' })
      .expect({ name: 'Julio' })
  })
})
