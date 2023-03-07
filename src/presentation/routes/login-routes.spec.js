const LoginRouter = require("./login-router");
const MissingParamError = require("../helpers/missing-param-error");

const makeSut = () => {
   return new LoginRouter();
};

describe("Login Router", () => {
   test("Should return 400 if no email is provided", () => {
      const sut = makeSut();
      const httpResquest = {
         body: {
            password: "any_password",
         },
      };
      const httpResponse = sut.route(httpResquest);
      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new MissingParamError("email"));
   });
   test("Should return 400 if no password is provided", () => {
      const sut = makeSut();
      const httpResquest = {
         body: {
            email: "any_email@mail.com",
         },
      };
      const httpResponse = sut.route(httpResquest);
      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new MissingParamError("password"));
   });

   test("should return 500 if no httpRequest is provided", () => {
      const sut = makeSut();
      const httpResponse = sut.route();
      expect(httpResponse.statusCode).toBe(500);
   });

   test("should return 500 if no httpRequest has no body", () => {
      const sut = makeSut();
      const httpResponse = sut.route({});
      expect(httpResponse.statusCode).toBe(500);
   });
});
