import { MissingParamError } from '../errrors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocolos/http'
import { badRequest } from '../helpers/httpRelper'

export class SignUpController {
  handle (httpReqest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']

    for (const field of requiredFields) {
      if (!httpReqest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
