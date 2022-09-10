import { badRequest, serverError, ok } from '@/presentation/helpers/http/httpHelper'
import { Validation } from '../../protocolos/validation'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  AddAccount,
} from './signup-controller-protocols'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount

  private readonly validation: Validation

  constructor(addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle(httpReqest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpReqest.body)
      if (error) return badRequest(error)
      const { name, email, password } = httpReqest.body

      const account = await this.addAccount.add({ name, email, password })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
