import { badRequest, serverError, ok } from '@/presentation/helpers/http/httpHelper'
import { Validation } from '../../protocolos/validation'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  AddAccount,
  Authentication,
} from './signup-controller-protocols'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) {}

  async handle(httpReqest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpReqest.body)
      if (error) return badRequest(error)
      const { name, email, password } = httpReqest.body

      await this.addAccount.add({ name, email, password })

      const accessToken = await this.authentication.auth({ email, password })

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
