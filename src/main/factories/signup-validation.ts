import { ValidationComposite } from '@/presentation/helpers/validator/validation-composite'
import { RequiredFieldValidation } from '@/presentation/helpers/validator/required-filed-validation'
import { Validation } from '@/presentation/helpers/validator/validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validation: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation'])
    validation.push(new RequiredFieldValidation(field))

  return new ValidationComposite(validation)
}
