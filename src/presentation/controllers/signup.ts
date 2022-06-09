import { MissingParamError } from '../errrors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocolos/http'
import { badRequest } from '../helpers/httpRelper'

export class SignUpController {
  handle (httpReqest: HttpRequest): HttpResponse {
    if (!httpReqest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpReqest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
