import { ValidationComposite } from '@/presentation/helpers/validator/validation-composite'
import { RequiredFieldValidation } from '@/presentation/helpers/validator/required-field-validation'
import { Validation } from '@/presentation/protocolos/validation'
import { CompareFieldsValidation } from '@/presentation/helpers/validator/compare-fields-validation'
import { EmailValidation } from '@/presentation/helpers/validator/email-validation'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validation: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation'])
    validation.push(new RequiredFieldValidation(field))

  validation.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

  validation.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validation)
}
