import { ValidationComposite } from '@/presentation/helpers/validator/validation-composite'
import { makeLoginValidation } from './login-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validator/required-field-validation'
import { Validation } from '@/presentation/protocolos/validation'
import { EmailValidator } from '@/presentation/protocolos/email-validator'
import { EmailValidation } from '@/presentation/helpers/validator/email-validation'

jest.mock('@/presentation/helpers/validator/validation-composite')

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
