import { Controller, HttpRequest, HttpResponse } from '../../protocolos'
import { badRequest } from '../../helpers/httpHelper'
import { MissingParamError } from '../../errors/missing-param-error'

export class LoginController implements Controller {
  async handle(httpReqest: HttpRequest): Promise<HttpResponse> {
    if (!httpReqest.body.email) return badRequest(new MissingParamError('email'))

    if (!httpReqest.body.password)
      return badRequest(new MissingParamError('password'))
  }
}
