import { HttpRequest, HttpResponse } from './http'

export interface Middleware {
  handle(httpReqest: HttpRequest): Promise<HttpResponse>
}
