import { ValidationComposite } from '@/presentation/helpers/validator/validation-composite'
import { makeSignUpValidation } from './signup-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validator/required-field-validation'
import { Validation } from '@/presentation/helpers/validator/validation'
import { CompareFieldsValidation } from '@/presentation/helpers/validator/compare-fields-validation'

jest.mock('@/presentation/helpers/validator/validation-composite')

describe('SignUpValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()

    const validation: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation'])
      validation.push(new RequiredFieldValidation(field))

    validation.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

    expect(ValidationComposite).toHaveBeenCalledWith(validation)
  })
})
