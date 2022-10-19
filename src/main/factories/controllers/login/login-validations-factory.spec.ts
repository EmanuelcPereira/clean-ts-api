import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@/validation/validator'
import { makeLoginValidation } from './login-validation-factory'
import { Validation } from '@/presentation/protocolos'
import { EmailValidator } from '@/validation/protocols/email-validator'

jest.mock('@/validation/validator/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoginValidation()

    const validation: Validation[] = []

    for (const field of ['email', 'password'])
      validation.push(new RequiredFieldValidation(field))

    validation.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validation)
  })
})
