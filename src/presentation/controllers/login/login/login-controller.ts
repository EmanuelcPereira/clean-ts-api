import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@/presentation/helpers/http/httpHelper'
import {
  Authentication,
  HttpRequest,
  HttpResponse,
  Controller,
  Validation,
} from './login-controller-protocols'

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation,
  ) {}

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
