import { ValidationComposite } from '@/presentation/helpers/validator/validation-composite'
import { makeSignUpValidation } from './signup-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validator/required-field-validation'
import { Validation } from '@/presentation/helpers/validator/validation'
import { CompareFieldsValidation } from '@/presentation/helpers/validator/compare-fields-validation'
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
    makeSignUpValidation()

    const validation: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation'])
      validation.push(new RequiredFieldValidation(field))

    validation.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

    validation.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validation)
  })
})
