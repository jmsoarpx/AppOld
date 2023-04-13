const cors = require('../middlewares/cors')

module.exports = (app) => {
  app.disable('X-Powered-By')
  app.use(cors)
}
