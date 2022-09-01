import { ValidationComposite } from '@/presentation/helpers/validator/validation-composite'
import { RequiredFieldValidation } from '@/presentation/helpers/validator/required-field-validation'
import { Validation } from '@/presentation/helpers/validator/validation'
import { EmailValidation } from '@/presentation/helpers/validator/email-validation'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validation: Validation[] = []

  for (const field of ['email', 'password'])
    validation.push(new RequiredFieldValidation(field))

  validation.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validation)
}
