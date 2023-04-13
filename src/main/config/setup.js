const cors = require('../middlewares/cors')
const jsonParser = require('../middlewares/json-parser')
const contetType = require('../middlewares/content-type')

module.exports = (app) => {
  app.disable('X-Powered-By')
  app.use(cors)
  app.use(jsonParser)
  app.use(contetType)
}
