module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:3001/clean-node-api',
  port: process.env.PORT || 3000
}
