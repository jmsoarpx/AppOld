module.exports = class ServerError extends Error {
  constructor (paramName) {
    super('internal error')
    this.name = 'Erro interno'
  }
}
