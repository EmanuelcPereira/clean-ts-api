import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/httpRelper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '@/presentation/protocolos'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpReqest: HttpRequest): HttpResponse {
    try {
      const { email, password, passwordConfirmation } = httpReqest.body
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpReqest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
