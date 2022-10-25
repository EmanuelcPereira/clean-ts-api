import { HttpRequest, HttpResponse, Middleware } from '../protocolos'
import { forbidden } from '../helpers/http/httpHelper'
import { AccessDeniedError } from '../errors/access-denied-error'

export class AuthMiddleware implements Middleware {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}
