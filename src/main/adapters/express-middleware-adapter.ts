import { NextFunction, Request, Response } from 'express'
import { HttpRequest } from '@/presentation/protocolos'
import { Middleware } from '@/presentation/protocolos/middleware'

export const adaptMIddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse)
      next()
    } else {
      res.status(httpResponse.statusCode).json(httpResponse.body.message)
    }
  }
}
