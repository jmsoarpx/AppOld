module.exports = class UnauthorizedError extends Error {
  constructor (paramName) {
    super('unauthorizedError')
    this.name = 'unauthorizedError'
  }
}
