import { MissingParamError } from '@/presentation/errrors/missing-param-error'
import { HttpRequest, HttpResponse } from '@/presentation/protocolos/http'
import { badRequest } from '@/presentation/helpers/httpRelper'
import { Controller } from '@/presentation/protocolos/controller'
import { EmailValidator } from '@/presentation/protocolos/email-validator'
import { InvalidParamError } from '@/presentation/errrors/invalid-param-error'
import { ServerError } from '@/presentation/errrors/server-error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpReqest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpReqest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpReqest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
