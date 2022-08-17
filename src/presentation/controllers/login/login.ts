import { Controller, HttpRequest, HttpResponse } from '../../protocolos'
import { badRequest } from '../../helpers/httpHelper'
import { MissingParamError } from '../../errors/missing-param-error'
import { EmailValidator } from '../../protocolos/email-validator'
import { InvalidParamError } from '../../errors/invalid-param-error'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle(httpReqest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpReqest.body
    if (!email) return badRequest(new MissingParamError('email'))

    if (!password) return badRequest(new MissingParamError('password'))

    const isValid = this.emailValidator.isValid(email)

    if (!isValid) return badRequest(new InvalidParamError('email'))
  }
}
