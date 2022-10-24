import { Validation } from '@/presentation/protocolos'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validator'

import { makeAddSurveyValidation } from './add-survey-validation-factory'

jest.mock('@/validation/validator/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('AddSurveyValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()

    const validation: Validation[] = []

    for (const field of ['question', 'answers'])
      validation.push(new RequiredFieldValidation(field))

    expect(ValidationComposite).toHaveBeenCalledWith(validation)
  })
})
