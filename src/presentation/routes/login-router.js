const HttpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpResquest) {
    if (!httpResquest || !httpResquest.body || !this.authUseCase || !this.authUseCase.auth) {
      return HttpResponse.serverError()
    }
    const { email, password } = httpResquest.body
    if (!email) {
      return HttpResponse.bedRequest('email')
    }
    if (!password) {
      return HttpResponse.bedRequest('password')
    }
    const accessToken = this.authUseCase.auth(email, password)
    if (!accessToken) {
      return HttpResponse.unauthorizedError()
    }
    return HttpResponse.ok()
  }
}
