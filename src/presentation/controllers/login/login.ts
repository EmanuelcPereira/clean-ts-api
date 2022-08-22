import { Controller, HttpRequest, HttpResponse } from '../../protocolos'
import { badRequest, serverError } from '../../helpers/httpHelper'
import { MissingParamError } from '../../errors/missing-param-error'
import { EmailValidator } from '../../protocolos/email-validator'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { Authentication } from '../../../domain/usecases/authentication'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  private readonly authentication: Authentication

  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle(httpReqest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpReqest.body[field]) return badRequest(new MissingParamError(field))
      }

      const { email, password } = httpReqest.body
      const isValid = this.emailValidator.isValid(email)

      if (!isValid) return badRequest(new InvalidParamError('email'))

      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
