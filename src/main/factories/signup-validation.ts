import { ValidationComposite } from '@/presentation/helpers/validator/validation-composite'
import { RequiredFieldValidation } from '@/presentation/helpers/validator/required-field-validation'
import { Validation } from '@/presentation/helpers/validator/validation'
import { CompareFieldsValidation } from '@/presentation/helpers/validator/compare-fields-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validation: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation'])
    validation.push(new RequiredFieldValidation(field))

  validation.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

  return new ValidationComposite(validation)
}
