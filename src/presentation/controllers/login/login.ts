import { Controller, HttpRequest, HttpResponse } from '../../protocolos'
import { badRequest } from '../../helpers/httpHelper'
import { MissingParamError } from '../../errors/missing-param-error'
import { EmailValidator } from '../../protocolos/email-validator'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle(httpReqest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpReqest.body
    if (!email) return badRequest(new MissingParamError('email'))

    if (!password) return badRequest(new MissingParamError('password'))

    this.emailValidator.isValid(email)
  }
}
