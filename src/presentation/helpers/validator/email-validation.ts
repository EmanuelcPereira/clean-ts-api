import { Validation } from '../../protocolos/validation'
import { EmailValidator } from '@/presentation/protocolos/email-validator'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  validate(input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])

    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
