import { HttpRequest, HttpResponse } from './http'

export interface Controller {
  handle(httpReqest: HttpRequest): Promise<HttpResponse>
}
