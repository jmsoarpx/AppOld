const HttpResponse = require("../helpers/http-response");

module.exports = class LoginRouter {
   route(httpResquest) {
      if (!httpResquest || !httpResquest.body) {
         return HttpResponse.serverError();
      }
      const { email, password } = httpResquest.body;
      if (!email) {
         return HttpResponse.bedRequest("email");
      }
      if (!password) {
         return HttpResponse.bedRequest("password");
      }
   }
};
