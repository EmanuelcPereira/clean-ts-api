import { badRequest, serverError, ok } from '@/presentation/helpers/httpHelper'
import { Validation } from '../../helpers/validator/validation'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  AddAccount,
} from './signup-protocols'

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
