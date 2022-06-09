import { MissingParamError } from '@/presentation/errrors/missing-param-error'
import { HttpRequest, HttpResponse } from '@/presentation/protocolos/http'
import { badRequest } from '@/presentation/helpers/httpRelper'
import { Controller } from '@/presentation/protocolos/controller'

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
