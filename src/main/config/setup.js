module.exports = (app) => {
  app.disable('X-Powered-By')
  app.use((req, res, next) => {
    res.set('access-control-allow-origin', '*')
    res.set('access-control-allow-methods', '*')
    res.set('access-control-allow-headers', '*')
    next()
  })
}