import { Controller, HttpRequest, HttpResponse } from '../../protocolos'
import { badRequest } from '../../helpers/httpHelper'
import { MissingParamError } from '../../errors/missing-param-error'

export class LoginController implements Controller {
  async handle(httpReqest: HttpRequest): Promise<HttpResponse> {
    return badRequest(new MissingParamError('email'))
  }
}
