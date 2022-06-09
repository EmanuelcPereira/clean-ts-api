import { MissingParamError } from '../errrors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocolos/http'

export class SignUpController {
  handle (httpReqest: HttpRequest): HttpResponse {
    if (!httpReqest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }

    if (!httpReqest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
  }
}
