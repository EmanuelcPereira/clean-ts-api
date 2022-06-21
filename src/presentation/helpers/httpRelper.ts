import { HttpResponse } from '@/presentation/protocolos/http'
import { ServerError } from '@/presentation/errrors/server-error'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
