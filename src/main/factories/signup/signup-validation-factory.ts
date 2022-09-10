import {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation,
  EmailValidation,
} from '@/presentation/helpers/validator'
import { Validation } from '@/presentation/protocolos'

import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validation: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation'])
    validation.push(new RequiredFieldValidation(field))

  validation.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

  validation.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validation)
}
