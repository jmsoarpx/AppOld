const cors = require('../middlewares/cors')
const jsonParser = require('../middlewares/json-parser')

module.exports = (app) => {
  app.disable('X-Powered-By')
  app.use(cors)
  app.use(jsonParser)
}
