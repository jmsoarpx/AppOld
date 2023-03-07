module.exports = class MissingParamError extends Error {
  constructor (paramName) {
    super('unauthorizedError')
    this.name = 'unauthorizedError'
  }
}
