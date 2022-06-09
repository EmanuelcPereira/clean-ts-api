import { MissingParamError } from '../errrors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocolos/http'
import { badRequest } from '../helpers/httpRelper'
import { Controller } from '../protocolos/controller'

export class SignUpController implements Controller {
  handle (httpReqest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpReqest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
