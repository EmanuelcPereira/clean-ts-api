import {
  ValidationComposite,
  EmailValidation,
  CompareFieldsValidation,
  RequiredFieldValidation,
} from '@/presentation/helpers/validator'
import { makeSignUpValidation } from './signup-validation'
import { Validation, EmailValidator } from '@/presentation/protocolos'

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
    makeSignUpValidation()

    const validation: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation'])
      validation.push(new RequiredFieldValidation(field))

    validation.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

    validation.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validation)
  })
})
