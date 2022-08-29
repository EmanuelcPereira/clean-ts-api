import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { badRequest, serverError, ok } from '@/presentation/helpers/httpHelper'
import { Validation } from '../../helpers/validator/validation'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  AddAccount,
  EmailValidator,
} from './signup-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  private readonly addAccount: AddAccount

  private readonly validation: Validation

  constructor(
    emailValidator: EmailValidator,
    addAccount: AddAccount,
    validation: Validation,
  ) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle(httpReqest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpReqest.body)
      if (error) return badRequest(error)
      const { name, email, password, passwordConfirmation } = httpReqest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({ name, email, password })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
