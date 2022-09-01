import {
  badRequest,
  serverError,
  unauthorized,
  ok,
} from '../../helpers/http/httpHelper'
import {
  Authentication,
  HttpRequest,
  HttpResponse,
  Controller,
  Validation,
} from './login-protocols'

export class LoginController implements Controller {
  private readonly authentication: Authentication

  private readonly validation: Validation

  constructor(authentication: Authentication, validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle(httpReqest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpReqest.body)
      if (error) return badRequest(error)

      const { email, password } = httpReqest.body

      const accessToken = await this.authentication.auth({ email, password })

      if (!accessToken) return unauthorized()

      return ok(accessToken)
    } catch (error) {
      return serverError(error)
    }
  }
}
